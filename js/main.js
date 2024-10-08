document.addEventListener("DOMContentLoaded", () => {
  const mensaje = document.getElementById("mensaje");
  const operaciones = document.getElementById("operaciones");

  const mostrarMensaje = (text) => {
    mensaje.innerText = text;
  };

  const preguntar = async (text) => {
    const { value: respuesta } = await Swal.fire({
      title: text,
      input: 'text',
      inputPlaceholder: 'Escribe aquí...',
      showCancelButton: true,
    });
    return respuesta ? respuesta.trim() : "";
  };

  const obtenerTipoDeUsuario = async () => {
    const esValido = (tipo) => tipo === "administrador" || tipo === "cliente";

    let tipoDeUsuario;
    do {
      tipoDeUsuario = await preguntar("¿Cómo desea ingresar al sistema?\nComo Administrador\nComo Cliente");
      tipoDeUsuario = tipoDeUsuario.toLowerCase();
      if (!esValido(tipoDeUsuario)) {
        await Swal.fire(`'${tipoDeUsuario}' no es una opción válida. Por favor, ingrese 'Administrador' o 'Cliente'.`);
      }
    } while (!esValido(tipoDeUsuario));

    if (tipoDeUsuario === "cliente") {
      sessionStorage.setItem("tipoDeUsuario", "cliente");
    }

    return tipoDeUsuario;
  };

  const gestionarAccesoCliente = async (pinGuardado, maxIntentos = 3) => {
    for (let i = maxIntentos; i > 0; i--) {
      const ingreso = parseInt(await preguntar("Ingresa tu PIN."), 10);
      if (ingreso === pinGuardado) {
        mostrarMensaje("Bienvenido Cliente. Ya puedes operar.");
        return true;
      } else {
        await Swal.fire(`Error. Te quedan ${i - 1} intentos.`);
      }
    }
    mostrarMensaje("Acceso denegado. Te has quedado sin intentos.");
    return false;
  };

  const registrarTransaccion = (transacciones, tipo, monto) => {
    transacciones.push({ tipo, monto, fecha: new Date() });
    sessionStorage.setItem("transacciones", JSON.stringify(transacciones));
  };

  const consultarSaldo = (saldo, saldoDolares) => {
    // Usar SweetAlert para mostrar el saldo al usuario
    Swal.fire({
      title: 'Saldo Actual',
      html: `Saldo en pesos: <strong>$${saldo}</strong><br>Saldo en dólares: <strong>$${saldoDolares}</strong>`,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  };

  const retirarDinero = async (saldo, transacciones) => {
    const retiro = parseInt(await preguntar("Ingrese cuánto dinero desea retirar."), 10);
    if (isNaN(retiro)) {
      mostrarMensaje("Por favor, ingrese una cantidad válida.");
      return saldo;
    }
    if (retiro <= saldo) {
      saldo -= retiro;
      registrarTransaccion(transacciones, "Retiro", retiro);
      sessionStorage.setItem("saldo", saldo);
      mostrarMensaje(`Retiro exitoso. Saldo actual: $${saldo}.`);
    } else {
      mostrarMensaje(`Fondos insuficientes. Saldo actual: $${saldo}.`);
    }
    return saldo;
  };

  const depositarDinero = async (saldo, transacciones) => {
    const deposito = parseInt(await preguntar("Ingrese cuánto dinero desea depositar."), 10);
    if (isNaN(deposito)) {
      mostrarMensaje("Por favor, ingrese una cantidad válida.");
      return saldo;
    }
    if (deposito <= 500000) {
      saldo += deposito;
      registrarTransaccion(transacciones, "Depósito", deposito);
      sessionStorage.setItem("saldo", saldo);
      mostrarMensaje(`Depósito exitoso. Saldo actual: $${saldo}.`);
    } else {
      mostrarMensaje("No se puede ingresar más de $500.000.");
    }
    return saldo;
  };

  const comprarDolares = async (saldo, saldoDolares, transacciones) => {
    const tasaDeCambio = 1000;
    const compraSiONo = (await preguntar("¿Desea comprar dólares? (si/no)")).toLowerCase();
    if (compraSiONo === "si") {
      const dolares = parseInt(await preguntar("¿Cuántos dólares desea comprar?"), 10);
      if (isNaN(dolares)) {
        mostrarMensaje("Por favor, ingrese una cantidad válida.");
        return [saldo, saldoDolares];
      }
      const costoEnPesos = dolares * tasaDeCambio;
      if (costoEnPesos <= saldo && dolares <= 200) {
        saldo -= costoEnPesos;
        saldoDolares += dolares;
        registrarTransaccion(transacciones, "Compra de dólares", dolares);
        sessionStorage.setItem("saldo", saldo);
        sessionStorage.setItem("saldoDolares", saldoDolares);
        mostrarMensaje(`Compra exitosa. Saldo en dólares: $${saldoDolares}. Saldo en pesos: $${saldo}.`);
      } else if (dolares > 200) {
        mostrarMensaje("El límite de compra de dólares es de $200.");
      } else {
        mostrarMensaje("Fondos insuficientes para comprar dólares.");
      }
    } else if (compraSiONo !== "no") {
      mostrarMensaje("Las opciones son 'si' o 'no'.");
    }
    return [saldo, saldoDolares];
  };

  const mostrarTransacciones = (transacciones) => {
    if (transacciones.length > 0) {
      let historial = "";
      transacciones.forEach(transaccion => {
        historial += `${transaccion.fecha.toLocaleString()}: ${transaccion.tipo} - $${transaccion.monto}<br>`;
      });

      Swal.fire({
        title: 'Transacciones realizadas',
        html: historial,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    } else {
      Swal.fire({
        title: 'No hay transacciones realizadas.',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const iniciarBanco = async () => {
    let tipoDeUsuario = sessionStorage.getItem("tipoDeUsuario");
    let pinGuardado = parseInt(sessionStorage.getItem("pinGuardado"), 10);

    if (tipoDeUsuario === "cliente" && pinGuardado) {
      // El usuario ya ha ingresado antes como cliente
      const acceso = await gestionarAccesoCliente(pinGuardado);
      if (!acceso) return;
    } else {
      // Nueva sesión, preguntar por el tipo de usuario
      tipoDeUsuario = await obtenerTipoDeUsuario();
      if (tipoDeUsuario === "cliente") {
        pinGuardado = parseInt(await preguntar("Ingrese su nuevo PIN."), 10);
        sessionStorage.setItem("pinGuardado", pinGuardado);
        const acceso = await gestionarAccesoCliente(pinGuardado);
        if (!acceso) return;
      }
    }

    if (tipoDeUsuario === "administrador") {
      mostrarMensaje("Ingresaste como Administrador.");
    } else if (tipoDeUsuario === "cliente") {
      let saldo = parseInt(sessionStorage.getItem("saldo"), 10) || 5000;
      let saldoDolares = parseInt(sessionStorage.getItem("saldoDolares"), 10) || 0;
      let transacciones = JSON.parse(sessionStorage.getItem("transacciones")) || [];

      operaciones.innerHTML = `
        <button id="consultar">Consultar Saldo</button>
        <button id="retirar">Retirar Dinero</button>
        <button id="depositar">Depositar Dinero</button>
        <button id="comprar">Comprar Dólares</button>
        <button id="transacciones">Mostrar Transacciones</button>
        <button id="salir">Salir</button>
      `;

      document.getElementById("consultar").onclick = () => consultarSaldo(saldo, saldoDolares);
      document.getElementById("retirar").onclick = async () => saldo = await retirarDinero(saldo, transacciones);
      document.getElementById("depositar").onclick = async () => saldo = await depositarDinero(saldo, transacciones);
      document.getElementById("comprar").onclick = async () => [saldo, saldoDolares] = await comprarDolares(saldo, saldoDolares, transacciones);
      document.getElementById("transacciones").onclick = () => mostrarTransacciones(transacciones);
      document.getElementById("salir").onclick = () => {
        mostrarMensaje("Gracias por usar nuestro banco. ¡Hasta luego!");
        operaciones.innerHTML = "";
      };
    }
  };

  iniciarBanco();
});

document.addEventListener("DOMContentLoaded", () => {
  const mensaje = document.getElementById("mensaje");
  const operaciones = document.getElementById("operaciones");
  const resultado = document.getElementById("resultado");

  // Función para mostrar un mensaje
  const mostrarMensaje = (text) => {
    mensaje.innerText = text;
  };

  // Función para obtener una respuesta del usuario, eliminando espacios en blanco
  const preguntar = (text) => {
    const respuesta = prompt(text);
    return respuesta ? respuesta.trim() : "";
  };

  // Función para verificar si el tipo de usuario es válido
  const obtenerTipoDeUsuario = () => {
    const esValido = (tipo) => tipo === "administrador" || tipo === "cliente";

    let tipoDeUsuario;
    do {
      tipoDeUsuario = preguntar("¿Cómo desea ingresar al sistema?\nComo Administrador\nComo Cliente").toLowerCase();
      if (!esValido(tipoDeUsuario)) {
        alert(`'${tipoDeUsuario}' no es una opción válida. Por favor, ingrese 'Administrador' o 'Cliente'.`);
      }
    } while (!esValido(tipoDeUsuario));
    return tipoDeUsuario;
  };

  // Función para gestionar el acceso del cliente
  const gestionarAccesoCliente = (pinGuardado, maxIntentos = 3) => {
    for (let i = maxIntentos; i > 0; i--) {
      let ingreso = parseInt(preguntar("Ingresa tu PIN."), 10);
      if (ingreso === pinGuardado) {
        mostrarMensaje("Bienvenido Cliente. Ya puedes operar.");
        return true;
      } else {
        alert(`Error. Te quedan ${i - 1} intentos.`);
      }
    }
    mostrarMensaje("Acceso denegado. Te has quedado sin intentos.");
    return false;
  };

  // Función para registrar transacciones
  const registrarTransaccion = (transacciones, tipo, monto) => {
    transacciones.push({ tipo, monto, fecha: new Date() });
  };

  // Función para consultar el saldo actual
  const consultarSaldo = (saldo, saldoDolares) => {
    mostrarMensaje(`Saldo actual: $${saldo}.\nSaldo en dólares: $${saldoDolares}.`);
  };

  // Función para retirar dinero
  const retirarDinero = (saldo, transacciones) => {
    let retiro = parseInt(prompt("Ingrese cuánto dinero desea retirar."), 10);
    if (isNaN(retiro)) {
      mostrarMensaje("Por favor, ingrese una cantidad válida.");
      return saldo;
    }
    if (retiro <= saldo) {
      saldo -= retiro;
      registrarTransaccion(transacciones, "Retiro", retiro);
      mostrarMensaje(`Retiro exitoso. Saldo actual: $${saldo}.`);
    } else {
      mostrarMensaje(`Fondos insuficientes. Saldo actual: $${saldo}.`);
    }
    return saldo;
  };

  // Función para depositar dinero
  const depositarDinero = (saldo, transacciones) => {
    let deposito = parseInt(prompt("Ingrese cuánto dinero desea depositar."), 10);
    if (isNaN(deposito)) {
      mostrarMensaje("Por favor, ingrese una cantidad válida.");
      return saldo;
    }
    if (deposito <= 500000) {
      saldo += deposito;
      registrarTransaccion(transacciones, "Depósito", deposito);
      mostrarMensaje(`Depósito exitoso. Saldo actual: $${saldo}.`);
    } else {
      mostrarMensaje("No se puede ingresar más de $500.000.");
    }
    return saldo;
  };

  // Función para comprar dólares
  const comprarDolares = (saldo, saldoDolares, transacciones) => {
    const tasaDeCambio = 1000;
    let compraSiONo = preguntar("¿Desea comprar dólares? (si/no)").toLowerCase();
    if (compraSiONo === "si") {
      let dolares = parseInt(prompt("¿Cuántos dólares desea comprar?"), 10);
      if (isNaN(dolares)) {
        mostrarMensaje("Por favor, ingrese una cantidad válida.");
        return [saldo, saldoDolares];
      }
      let costoEnPesos = dolares * tasaDeCambio;
      if (costoEnPesos <= saldo && dolares <= 200) {
        saldo -= costoEnPesos;
        saldoDolares += dolares;
        registrarTransaccion(transacciones, "Compra de dólares", dolares);
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

  // Función para mostrar el historial de transacciones
  const mostrarTransacciones = (transacciones) => {
    if (transacciones.length > 0) {
      let historial = "Transacciones realizadas:<br>";
      transacciones.forEach(transaccion => {
        historial += `${transaccion.fecha.toLocaleString()}: ${transaccion.tipo} - $${transaccion.monto}<br>`;
      });
      resultado.innerHTML = historial;
    } else {
      resultado.innerHTML = "No hay transacciones realizadas.";
    }
  };

  // Función para iniciar el banco
  const iniciarBanco = () => {
    let usuario = obtenerTipoDeUsuario();

    if (usuario === "administrador") {
      mostrarMensaje("Ingresaste como Administrador.");
      // Lógica para administrador
    } else if (usuario === "cliente") {
      mostrarMensaje("Ingresaste como Cliente.");
      let pinGuardado = parseInt(prompt("Ingrese su nuevo PIN."), 10);
      let acceso = gestionarAccesoCliente(pinGuardado);

      if (acceso) {
        let saldo = 5000;
        let saldoDolares = 0;
        let transacciones = [];

        operaciones.innerHTML = `
          <button id="consultar">Consultar Saldo</button>
          <button id="retirar">Retirar Dinero</button>
          <button id="depositar">Depositar Dinero</button>
          <button id="comprar">Comprar Dólares</button>
          <button id="transacciones">Mostrar Transacciones</button>
          <button id="salir">Salir</button>
        `;

        document.getElementById("consultar").onclick = () => consultarSaldo(saldo, saldoDolares);
        document.getElementById("retirar").onclick = () => saldo = retirarDinero(saldo, transacciones);
        document.getElementById("depositar").onclick = () => saldo = depositarDinero(saldo, transacciones);
        document.getElementById("comprar").onclick = () => [saldo, saldoDolares] = comprarDolares(saldo, saldoDolares, transacciones);
        document.getElementById("transacciones").onclick = () => mostrarTransacciones(transacciones);
        document.getElementById("salir").onclick = () => {
          mostrarMensaje("Gracias por usar nuestro banco. ¡Hasta luego!");
          operaciones.innerHTML = "";
          resultado.innerHTML = "";
        };
      }
    }
  };

  iniciarBanco();
});
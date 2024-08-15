
document.addEventListener("DOMContentLoaded", () => {
  const mensaje = document.getElementById("mensaje");
  const operaciones = document.getElementById("operaciones");
  const resultado = document.getElementById("resultado");


  //FUNCION APRA MOSTRAR UN MENSAJE
  const mostrarMensaje = (text) => {
    mensaje.innerText = text;
  };


  //FUNCION QUE SI EL USUARIO NO INGRESA NADA DEVUELVE UNA CADENA VACIA O EL DATO PROPORCIONADO CON EL METODO "trim()" QUE ELIMINA LOS ESPACIOS EN BLANCO AL PRINCIPIO Y AL FINAL
  const preguntar = (text) => {
    const respuesta = prompt(text);
    return respuesta ? respuesta.trim() : "";
  };


  //FUNCION PARA SABER SI ES CLIENTE O ADMINISTRADOR
  const obtenerTipoDeUsuario = (preguntar) => {
    const esValido = (tipo) => tipo === "administrador" || tipo === "cliente";

    let tipoDeUsuario;
    while (true) {
      tipoDeUsuario = preguntar("¿Cómo desea ingresar al sistema?\nComo Administrador\nComo Cliente").toLowerCase();
      if (esValido(tipoDeUsuario)) {
        return tipoDeUsuario;
      } else {
        alert(`'${tipoDeUsuario}' no es una opción válida. Por favor, ingrese 'Administrador' o 'Cliente'.`);
      }
    }
  };


  //FUNCION PARA EL INICIO DE SESION Y VERIFICACION DE LA MISMA
  const gestionarAccesoCliente = (pinGuardado, maxIntentos = 3) => {
    for (let i = maxIntentos - 1; i >= 0; i--) {
      let ingreso = preguntar("Ingresa tu PIN.");
      if (parseInt(ingreso) === pinGuardado) {
        mostrarMensaje("Bienvenido Cliente. Ya puedes operar.");
        return true;
      } else {
        alert(`Error. Te quedan ${i} intentos.`);
      }
    }
    return false;
  };


  //FUNCION PARA CADA MOVIMIENTO QUE SE REALIZE EN LA CUENTA SEA UN DEPOSITO UN RETIRO O UNA COMRPA DE DOLARES CADA VEZ QUE REALIZE UNA VA A GUARDAR ESE DATO Y LO VA A SUBIR A UN ARRAY
  const registrarTransaccion = (transacciones, tipo, monto) => {
    transacciones.push({ tipo, monto, fecha: new Date() });
  };


  //FUNCION PARA CONSULTAR EL SALDO DE ACTUAL DE LA CUENTA(DOLARES Y PESOS)
  const consultarSaldo = (saldo, saldoDolares) => {
    mostrarMensaje(`Saldo actual: $${saldo}.\nSaldo en dólares: $${saldoDolares}.`);
  };


  //FUNCION PARA RETIRAR DINERO
  const retirarDinero = (saldo, transacciones) => {
    let retiro = parseInt(prompt("Ingrese cuanto dinero desea retirar."));
    if (retiro <= saldo) {
      saldo -= retiro;
      registrarTransaccion(transacciones, "Retiro", retiro);
      mostrarMensaje(`Retiro exitoso. Saldo actual: $${saldo}.`);
    } else {
      mostrarMensaje(`Fondos insuficientes. Saldo actual: $${saldo}.`);
    }
    return saldo;
  };


  //FUNCION PARA DEPOSITAR DINERO
  const depositarDinero = (saldo, transacciones) => {
    let deposito = parseInt(prompt("Ingrese cuanto dinero desea depositar."));
    if (deposito <= 500000) {
      saldo += deposito;
      registrarTransaccion(transacciones, "Depósito", deposito);
      mostrarMensaje(`Depósito exitoso. Saldo actual: $${saldo}.`);
    } else {
      mostrarMensaje("No se puede ingresar más de $500.000.");
    }
    return saldo;
  };


  //FUNCION PARA COMPRAR DOLARES 
  const comprarDolares = (saldo, saldoDolares, transacciones) => {
    const tasaDeCambio = 1000;
    let compraSiONo = prompt("¿Desea comprar dólares? (si/no)").toLowerCase();
    if (compraSiONo === "si") {
      let dolares = parseInt(prompt("¿Cuántos dólares desea comprar?"));
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


  //FUNCION PARA LAS TRANSACCIONES DE LAS OPERACIONES QUE SE REALIZE
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


  //FUNCION PARA INICIAR EL BANCO CON SUS OPERACIONES DEPENDIENDO EL TIPO DE USUSARIO QUE ELIJA
  const iniciarBanco = () => {
    let usuario = obtenerTipoDeUsuario(preguntar);

    if (usuario === "administrador") {
      mostrarMensaje("Ingresaste como Administrador.");
      // Lógica para administrador
    } else if (usuario === "cliente") {
      mostrarMensaje("Ingresaste como Cliente.");
      let pinGuardado = parseInt(prompt("Ingrese su nuevo PIN."));
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
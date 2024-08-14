
alert("Bienvenido al banco");

// Función para obtener el tipo de usuario utilizando una función de orden superior
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

// Función para gestionar el acceso del cliente usando una función de orden superior
const gestionarAccesoCliente = (pinGuardado, maxIntentos = 3) => {
  for (let i = maxIntentos - 1; i >= 0; i--) {
    let ingreso = prompt("Ingresa tu PIN.");
    if (parseInt(ingreso) === pinGuardado) {
      alert("Bienvenido Cliente. Ya puedes operar.");
      return true;
    } else {
      alert(`Error. Te quedan ${i} intentos.`);
    }
  }
  return false;
};

// Función para registrar una transacción
const registrarTransaccion = (transacciones, tipo, monto) => {
  transacciones.push({ tipo, monto, fecha: new Date() });
};

// Función para mostrar el saldo
const consultarSaldo = (saldo, saldoDolares) => {
  alert(`Saldo actual: $${saldo}.\nSaldo en dólares: $${saldoDolares}.`);
};

// Función para retirar dinero
const retirarDinero = (saldo, transacciones) => {
  let retiro = parseInt(prompt("Ingrese cuanto dinero desea retirar."));
  if (retiro <= saldo) {
    saldo -= retiro;
    registrarTransaccion(transacciones, "Retiro", retiro);
    alert(`Retiro exitoso. Saldo actual: $${saldo}.`);
  } else {
    alert(`Fondos insuficientes. Saldo actual: $${saldo}.`);
  }
  return saldo;
};

// Función para depositar dinero
const depositarDinero = (saldo, transacciones) => {
  let deposito = parseInt(prompt("Ingrese cuanto dinero desea depositar."));
  if (deposito <= 500000) {
    saldo += deposito;
    registrarTransaccion(transacciones, "Depósito", deposito);
    alert(`Depósito exitoso. Saldo actual: $${saldo}.`);
  } else {
    alert("No se puede ingresar más de $500.000.");
  }
  return saldo;
};

// Función para comprar dólares
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
      alert(`Compra exitosa. Saldo en dólares: $${saldoDolares}. Saldo en pesos: $${saldo}.`);
    } else if (dolares > 200) {
      alert("El límite de compra de dólares es de $200.");
    } else {
      alert("Fondos insuficientes para comprar dólares.");
    }
  } else if (compraSiONo !== "no") {
    alert("Las opciones son 'si' o 'no'.");
  }
  return [saldo, saldoDolares];
};

// Función para mostrar las transacciones
const mostrarTransacciones = (transacciones) => {
  if (transacciones.length > 0) {
    let historial = "Transacciones realizadas:\n";
    transacciones.forEach(transaccion => {
      historial += `${transaccion.fecha.toLocaleString()}: ${transaccion.tipo} - $${transaccion.monto}\n`;
    });
    alert(historial);
  } else {
    alert("No hay transacciones realizadas.");
  }
};

// Función principal
const iniciarBanco = () => {
  let usuario = obtenerTipoDeUsuario(prompt);

  if (usuario === "administrador") {
    alert("Ingresaste como Administrador.");
    // Lógica para administrador
  } else if (usuario === "cliente") {
    alert("Ingresaste como Cliente.");
    let pinGuardado = parseInt(prompt("Ingrese su nuevo PIN."));
    let acceso = gestionarAccesoCliente(pinGuardado);

    if (acceso) {
      let saldo = 5000;
      let saldoDolares = 0;
      let transacciones = [];//Array de transacciones

      while (true) {
        let opcion = prompt("Seleccione una operación:\n1. Consultar Saldo\n2. Retirar Dinero\n3. Depositar Dinero\n4. Comprar Dólares\n5. Mostrar Transacciones\n6. Salir");

        if (opcion === "1") {
          consultarSaldo(saldo, saldoDolares);
        } else if (opcion === "2") {
          saldo = retirarDinero(saldo, transacciones);
        } else if (opcion === "3") {
          saldo = depositarDinero(saldo, transacciones);
        } else if (opcion === "4") {
          [saldo, saldoDolares] = comprarDolares(saldo, saldoDolares, transacciones);
        } else if (opcion === "5") {
          mostrarTransacciones(transacciones);
        } else if (opcion === "6") {
          alert("Gracias por usar nuestro banco. ¡Hasta luego!");
          break;
        } else {
          alert("Opción no válida. Por favor, seleccione una opción del 1 al 6.");
        }
      }
    }
  }
};

iniciarBanco();
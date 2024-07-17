


alert("Bienvenido al banco");


//ingresar como admin o como cliente

let obtenerTipoDeUsuario = () => {
  let tipoDeUsuario;

  while (true) {

    tipoDeUsuario = prompt("¿Cómo desea ingresar al sistema?\nComo Administrador\nComo Cliente");

    if (tipoDeUsuario) {

      tipoDeUsuario = tipoDeUsuario.toLowerCase();

      if (tipoDeUsuario === "administrador" || tipoDeUsuario === "cliente") {

        break; // Salir del bucle si la entrada es válida

      } else {

        alert("'" + tipoDeUsuario + "' no es una opción válida. Por favor, ingrese 'Administrador' o 'Cliente'.");

      }

    } else {

      alert("La entrada no puede estar vacía. Por favor, ingrese 'Administrador' o 'Cliente'.");

    }

  }

  return tipoDeUsuario;
}

let usuario = obtenerTipoDeUsuario();

if (usuario === "administrador") {
  // Lógica para administrador
  alert("Ingresaste como Administrador.");



} else if (usuario === "cliente") {
  // Lógica para cliente
  alert("Ingresaste como Cliente.");

  let pinGuardado = parseInt(prompt("Ingrese su nuevo PIN."))

  let ingresar = false

  for (let i = 2; i >= 0; i--) {
    let ingreso = prompt("Ingresa tu PIN.");
    if (pinGuardado == ingreso) {
      alert("Bienvenido Cliente. Ya podes operar.");
      ingresar = true;
      break;
    } else {
      alert("Error");
    }
  }
  //RETENDREMOS TU TARJETA COMUNICATE CON EL BANCO

  if (ingresar) {
    class CuentaBancaria {
      constructor(saldoInicial) {
        this.saldo = saldoInicial;
        this.saldoDolares = 0;
      }

      consultarSaldo() {
        alert("Saldo actual: $" + this.saldo + "." + "\nSaldo en dolares: " + this.saldoDolares);
      }

      retirarDinero() {
        let retiro = parseInt(prompt("Ingrese cuanto dinero desea retirar."));
        if (retiro <= this.saldo) {
          this.saldo -= retiro;
          alert("Retiro exitoso. Saldo actual: $" + this.saldo + ".");
        } else {
          alert("Fondos insuficientes. Saldo actual: $" + this.saldo + ".");
        }
      }

      depositarDinero() {
        let deposito = parseInt(prompt("Ingrese cuanto dinero desea depositar."));

        if (deposito <= 500000) {
          this.saldo += deposito;
          alert("Depósito exitoso. Saldo actual: $" + this.saldo + ".");

        } else {
          alert("no se puede ingresar mas de $500.000")
        }
      }

      comprarDolares() {
        alert("El dolar esta a ARS$1000 .")
        let compraSiONo = prompt("Desea comprar dolares?.");
        compraSiONo = compraSiONo.toLowerCase()
        if (compraSiONo === "si") {

          let dolares = parseInt(prompt("¿Cuántos dólares desea comprar?."));
          let costoEnPesos = dolares * this.pesoADolar();


          if (costoEnPesos <= this.saldo && dolares <= 200) {
            this.saldo -= costoEnPesos;
            this.saldoDolares += dolares;
            alert("Compra exitosa. Saldo en dólares: $" + this.saldoDolares + ". Saldo en pesos: $" + this.saldo + ".");
          } else if (dolares > 200) {
            alert("El limite de compra de dolares es de $200.");
          } else {
            alert("Fondos insuficientes para comprar dolares.")
          }
        } else if (compraSiONo === "no") {
        
        } else {
          alert("Las opciones son si o no.")
        }
      }


      pesoADolar() {
        //por si el dia de mañana cambia mi dolar ficticio
        return 1000;
      }
    }

    // Crear la cuenta bancaria con un saldo inicial
    let cuenta = new CuentaBancaria(5000);

    while (true) {
      let opcion = prompt("Seleccione una operación:\n1. Consultar Saldo\n2. Retirar Dinero\n3. Depositar Dinero\n4. Comprar Dólares\n5. Salir");

      if (opcion === "1") {
        cuenta.consultarSaldo();
      } else if (opcion === "2") {
        cuenta.retirarDinero();
      } else if (opcion === "3") {
        cuenta.depositarDinero();
      } else if (opcion === "4") {
        cuenta.comprarDolares();
      } else if (opcion === "5") {
        alert("Gracias por usar nuestro banco. ¡Hasta luego!.");
        break; // Salir del bucle y terminar el programa
      } else {
        alert("Opción no válida. Por favor, seleccione una opción del 1 al 5.");
      }

    }
  }
}




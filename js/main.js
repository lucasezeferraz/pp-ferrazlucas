alert("Bienvenido al banco");

//intentos de ingreso

let pinGuardado = parseInt(prompt("Ingrese su nuevo PIN"))
let ingresar = false;
for (let i = 2; i >= 0; i--) {
  let ingreso = prompt("Ingresa tu PIN");
  if (pinGuardado == ingreso) {
    alert("Bienvenido Cliente. Ya podes operar");
    ingresar = true;
    break;
  } else {
    alert("Error");
  }
}



//mostrar el menu

function menu() {
  if (ingresar) {
    let saldo = 20000;

    let opcion = prompt(
      "Elegí una opción: \n1 - Saldo. \n2 - Retiro de dinero. \n3 - Depósito. \nPresioná X para finalizar."
    );

    while (opcion != "x") {
      if (opcion == "1") {
        alert("Tu saldo es: $" + saldo);
      } else if (opcion == "2") {
        let retiro = parseInt(prompt("Ingresa el monto a retirar"));
        //comprobar si no hay saldo suficiente
        saldo = saldo - retiro;
        alert("Retiro exitoso, tu saldo es: $" + saldo);
      } else if (opcion == "3") {
        let deposito = parseInt(prompt("Ingresa el monto a depositrar"));
        //comprobar si excede el monto permitido por cajero
        saldo = saldo + deposito;
        alert("Deposito exitoso, tu saldo es: $" + saldo);
      } else {
        alert("opcion no valida")
      }

      //condicion de salida
      opcion = prompt(
        "Elegí una opción: \n1 - Saldo. \n2 - Retiro de dinero. \n3 - Depósito. \nPresioná X para finalizar."
      );
    }

  } else {
    alert("Retendremos tu tarjeta. Comunicate con el Banco");
  }
}
menu()







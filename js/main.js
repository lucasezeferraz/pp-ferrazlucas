



//--------------------------------------------------------------------------------SEGUNDO TRY--------------------------------------------------------------------------------   
//en este simulador lo que hice es validar las funciones y intentar que si no se cumple la funcion que no se cumpla la otra, pero me la complique y aveces no se cumplen algunas cosas como algunos alert





// alert("Bienvenido al banco");
// //intentos de ingreso
// let validacionIn=ingresoBancario();
// function ingresoBancario() {
//   let pinGuardado = parseInt(prompt("Ingresa tu nuevo PIN"));
//   for (let i = 2; i >= 0; i--) {
//     let ingreso = parseInt(prompt("Ingresa tu PIN"));
//     if (pinGuardado == ingreso) {
//       alert("Bienvenido, ya podes operar.");
//       return true
//     } else if (pinGuardado != ingreso) {
//       alert("Error, colocaste el pin incorrecto.");

//     } else {
//       alert("Ingresaste mal el pin muchas veces, retendremos tu tarjeta.")
//       return false
//     }

//   }

// }

// // no me tendria que saltar el cartel de menu si no pongo la clave correcta y tendria que saltar el mensaje de retendremos su tarjeta, comuniquese con el banco.

// //mostrar el menu 
// let saldo = 20000;
// let validacionOp=operaciones();
// function operaciones() {
//   let opcion =parseInt(prompt("Elegí una opción: \n1 - Saldo. \n2 - Retiro de dinero. \n3 - Depósito. \n Presioná X para finalizar."));

//   while (opcion == "1") {
//     alert("Tu saldo es de $" + saldo);
//     break
//   } if (opcion != NaN) {
//     alert("Error ingresa valores apropiados para la operación")
//   } else {

//     while (opcion == "2") {
//       let retiro = parseInt(prompt("Ingrese el monto a retirar"));
//       if (saldo < retiro) {
//         alert("Fondos insuficientes");
//       } else if (saldo >= retiro) {
//         saldo = saldo - retiro;
//         alert("Retiro exitoso, tu saldo es de $" + saldo);
//         break
//       }
//     }
//     while (opcion == "3") {
//       let deposito = parseInt(prompt("Ingrese el monto a depositar"));
//       if (deposito < 300000) {
//         saldo = saldo + deposito;
//         alert("Deposito exitoso, tu saldo es de $" + saldo + ".");
//         break
//       }
//       else if (deposito > 300000) {
//         alert("Para transacciones grandes comuniquese con el banco");
//       }
//       else (deposito != NaN);
//       {
//         alert("Error ingresa valores apropiados para la operación");
//       }
//     }
//   }
// }

// let validacionRep=repProceso();
// function repProceso() {
//   let repetir = prompt("Queres repetir la operacion: Responda con si o no");
//   if (repetir == "si") {
//     operaciones();
//     return true
//   } else if (repetir == "no") {
//     alert("Operaciones finalizada, para reclamos ...no se.");
//   }

// }



// if (validacionIn) {
//   validacionOp

// } else if (validacionOp) {
//   validacionRep
// } else {
//   alert("Operacion exitosa.")
// }











//--------------------------------------------------------------------------------PRIMER TRY---------------------------------------------------------------------------------


//en este simulador lo hice mas basico intentanto nomas que las function funcionen



// alert("Bienvenido al banco");
// //intentos de ingreso
// function ingresoBancario() {
//   let pinGuardado = parseInt(prompt("Ingresa tu nuevo PIN"));
//   for (let i = 2; i >= 0; i--) {
//     let ingreso = parseInt(prompt("Ingresa tu PIN"));
//     if (pinGuardado == ingreso) {
//       alert("Bienvenido, ya podes operar.");
//       break
//     } else if (pinGuardado != ingreso ) {
//       alert("Error, colocaste el pin incorrecto.");
//     }
//   }
// }
// ingresoBancario()
// // no me tendria que saltar el cartel de menu si no pongo la clave correcta y tendria que saltar el mensaje de retendremos su tarjeta, comuniquese con el banco.

// //mostrar el menu
// let saldo = 20000;

// function operaciones() {
//   let opcion = parseInt(prompt("Elegí una opción: \n1 - Saldo. \n2 - Retiro de dinero. \n3 - Depósito. \n Presioná X para finalizar."));

//   while (opcion == "1") {
//     alert("Tu saldo es de $" + saldo);
//     break
//   }


//   while (opcion == "2") {
//     let retiro = parseInt(prompt("Ingrese el monto a retirar"));
//     if (saldo < retiro) {
//       alert("Fondos insuficientes");
//     } else if (saldo >= retiro) {
//       saldo = saldo - retiro;
//       alert("Retiro exitoso, tu saldo es de $" + saldo);
//       break
//     }else if(retiro!=NaN){

//     }
//   }


//   while (opcion == "3") {
//     let deposito = parseInt(prompt("Ingrese el monto a depositar"));
//     if (deposito > 300000) {
//       alert("Deposito exitoso, tu saldo es de $" + saldo + ".");
//     }
//     else if (deposito < 300000) {
//       saldo = saldo + deposito;
//       alert("Para transacciones grandes comuniquese con el banco");
//       break
//     }
//     else if(deposito != NaN) {
//       alert("Error ingresa valores apropiados para la operación");
//     }
//   }
// }
//   operaciones()

//   function repProceso() {
//     let repetir = prompt("Queres repetir la operacion: Responda con si o no");
//     if (repetir == "si") {
//       operaciones();
//     } else if (repetir == "no") {
//       alert("Operacion finalizada, para reclamos ...no se.");
//     }

//   }
//   repProceso()





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------Intento mas basico
alert("Bienvenido al banco");

//intentos de ingreso

let pinGuardado = parseInt(prompt("Ingrese su nuevo PIN"));
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

// Hola profe le queria pedir si me puede corregir los otros intentos por que no se como hacer para que funcionen creo que estoy poniendo mal los return y tambien llamando mal a las funciones, intente tambien hacer un if else pero llamando las funciones y no me sale 






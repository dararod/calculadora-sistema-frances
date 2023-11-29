let valorInicialPrestamo = document.getElementById("prestamo");
let tasaPactada = document.getElementById("tasa");
let cantidadCuotas = document.getElementById("cuotas");


console.log(valorInicialPrestamo, tasaPactada, cantidadCuotas);
// function promptFloat(mensaje) {
//     let valor = parseFloat(prompt(mensaje));
//     while (isNaN(valor) || Math.sign(valor) === -1 || valor === 0) {
//         alert("Porfavor ingrese valores numéricos positivos");
//         valor = parseFloat(prompt(mensaje));
//     }
//     return valor
// }

// function calcularCuota(prestamo, interes, cuotas) {
//     return prestamo * interes / (1 - Math.pow((1 + interes), -cuotas));
// }

// function crearTablaCuotas(numeroCuota, interes, amortizacion, saldo, cuota) {
//     return {
//         numeroCuota,
//         interes,
//         amortizacion,
//         saldo,
//         cuota
//     }
// }

// // Ingresa datos del usuario
// const valorInicialPrestamo = promptFloat("Ingrese el valor del préstamo");
// const tasaPactada = promptFloat("Ingrese la tasa pactada");
// const cantidadCuotas = promptFloat("Ingrese la cantidad de cuotas");

// function listarCuotas(cantidadCuotas, tasaPactada) {
//     const tasa = tasaPactada / 100;
//     const listaCuotas = [];

//     let valorPrestamo = valorInicialPrestamo;
//     let cuota = calcularCuota(valorInicialPrestamo, tasa, cantidadCuotas);
//     cuota = cuota.toFixed(2);

//     for (let i = 0; i < cantidadCuotas; i++) {
//         let valorInteres = valorPrestamo * (1 + tasa) - valorPrestamo;
//         let valorAmortizacion = cuota - valorInteres;
//         valorPrestamo -= valorAmortizacion; 

//         valorInteres = valorInteres.toFixed(2);
//         valorAmortizacion = valorAmortizacion.toFixed(2);
//         valorPrestamo.toFixed(2);
//         const tablaCuotas = crearTablaCuotas(i + 1, valorInteres, valorAmortizacion, valorPrestamo, cuota)

//         listaCuotas.push(tablaCuotas);
//     }

//     return listaCuotas;
// }

// // Calcula y muestra cuotas
// const cuotas = listarCuotas(cantidadCuotas, tasaPactada);
// console.table(cuotas);

// // Muestra mensaje final
// const lineasDeMensaje = [
//     `Importe: ${valorInicialPrestamo} um`,
//     `Tipo de interés: ${tasaPactada} %`,
//     `Plazo de amortizacion: ${cantidadCuotas}`,
//     `Cuota: ${cuotas[0].cuota} um`,
//     `Ultima amortizacion: ${cuotas[cuotas.length - 1].amortizacion}`
// ];
// const mensaje = lineasDeMensaje.join("\n");

// alert(mensaje);
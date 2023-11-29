// Ingresa datos del usuario
let inputValorInicialPrestamo = document.getElementById("prestamo");
let inputTasaPactada = document.getElementById("tasa");
let inputCantidadCuotas = document.getElementById("cuotas");

let boton = document.getElementById("button").addEventListener('submit', (event) => {
    event.preventDefault();
});

const valorInicialPrestamo = inputValorInicialPrestamo.valueAsNumber;
const tasaPactada = inputTasaPactada.valueAsNumber;
const cantidadCuotas = inputCantidadCuotas.valueAsNumber; 

function calcularCuota(prestamo, interes, cuotas) {
    return prestamo * interes / (1 - Math.pow((1 + interes), -cuotas));
}

function crearTablaCuotas(numeroCuota, interes, amortizacion, saldo, cuota) {
    return {
        numeroCuota,
        interes,
        amortizacion,
        saldo,
        cuota
    }
}

function listarCuotas(cantidadCuotas, tasaPactada) {
    const tasa = tasaPactada / 100;
    const listaCuotas = [];

    let valorPrestamo = valorInicialPrestamo;
    let cuota = calcularCuota(valorInicialPrestamo, tasa, cantidadCuotas);
    cuota = cuota.toFixed(2);

    for (let i = 0; i < cantidadCuotas; i++) {
        let valorInteres = valorPrestamo * (1 + tasa) - valorPrestamo;
        let valorAmortizacion = cuota - valorInteres;
        valorPrestamo -= valorAmortizacion; 

        valorInteres = valorInteres.toFixed(2);
        valorAmortizacion = valorAmortizacion.toFixed(2);
        valorPrestamo.toFixed(2);
        const tablaCuotas = crearTablaCuotas(i + 1, valorInteres, valorAmortizacion, valorPrestamo, cuota)

        listaCuotas.push(tablaCuotas);
    }

    return listaCuotas;
}

// Calcula y muestra cuotas
const cuotas = listarCuotas(cantidadCuotas, tasaPactada);
console.table(cuotas);

// Muestra mensaje final
const lineasDeMensaje = [
    `Importe: ${valorInicialPrestamo} um`,
    `Tipo de interés: ${tasaPactada} %`,
    `Plazo de amortizacion: ${cantidadCuotas}`,
    `Cuota: ${cuotas[0].cuota} um`,
    `Ultima amortizacion: ${cuotas[cuotas.length - 1].amortizacion}`
];
const mensaje = lineasDeMensaje.join("\n");

const tableBody = document.getElementById("tbody");

const tr = document.createElement("tr");

const tdNCuota = document.createElement("td");
const tdCapital = document.createElement("td");
const tdAmortizacion = document.createElement("td");
const tdIntereses = document.createElement("td");
const tdCuota = document.createElement("td");

tr.appendChild(tdNCuota);
tr.appendChild(tdCapital);
tr.appendChild(tdAmortizacion);
tr.appendChild(tdIntereses);
tr.appendChild(tdCuota);

tdNCuota.textContent = cuotas[0].numeroCuota;
tdCapital.textContent = cuotas[0].saldo;
tdAmortizacion.textContent = cuotas[0].amortizacion;
tdIntereses.textContent = cuotas[0].interes;
tdCuota.textContent = cuotas[0].cuota;

tableBody.appendChild(tr);
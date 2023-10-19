let valorPrestamo = parseFloat(prompt("Ingrese el valor del préstamo"));
let tasaPactada = parseFloat(prompt("Ingrese la tasa pactada"));
let cantidadCuotas = parseFloat(prompt("Ingrese la cantidad de cuotas"));

function functionCuota (prestamo, interes, cuotas) {
    return prestamo * interes / (1 - Math.pow((1 + interes), -cuotas));
}

while (isNaN(valorPrestamo) || isNaN(tasaPactada) || isNaN(cantidadCuotas)){
    alert("Porfavor ingrese valores numéricos")
    valorPrestamo = parseFloat(prompt("Ingrese el valor del préstamo"));
    tasaPactada = parseFloat(prompt("Ingrese la tasa pactada"));
    cantidadCuotas = parseFloat(prompt("Ingrese la cantidad de cuotas"));
}

if (isNaN(valorPrestamo) || isNaN(cantidadCuotas) || isNaN(tasaPactada)) {
    alert("Porfavor ingrese valores numéricos");
} else {
    let tasa = tasaPactada / 100;
    let cuota = functionCuota(valorPrestamo, tasa, cantidadCuotas);
    
    alert(`Importe: ${valorPrestamo} um \nTipo de interés: ${tasaPactada} % \nPlazo de amortizacion: ${cantidadCuotas} \nCuota: ${cuota.toFixed(2)} um `)
}

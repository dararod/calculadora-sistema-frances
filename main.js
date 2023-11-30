// Toma los inputs del HTML 
let inputValorInicialPrestamo = document.getElementById("prestamo");
let inputTasaPactada = document.getElementById("tasa");
let inputCantidadCuotas = document.getElementById("cuotas");


let contador = 0
let boton = document.getElementById("button");

boton.onclick = () => {
    contador++
}

boton.addEventListener('click', (event) => {
    event.preventDefault();

// Extrae valores de los inputs
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

    const cuotas = listarCuotas(cantidadCuotas, tasaPactada);

    const tableBody = document.getElementById("tbody");

    localStorage.setItem("Valores", JSON.stringify(cuotas))
    let lSTable = JSON.parse(localStorage.getItem("Valores"))

    if (lSTable != [{}] && contador === 0){
        lSTable.forEach(value => {
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
        
                tdNCuota.textContent = value.numeroCuota;
                tdCapital.textContent = value.saldo;
                tdAmortizacion.textContent = value.amortizacion;
                tdIntereses.textContent = value.interes;
                tdCuota.textContent = value.cuota;
                tableBody.appendChild(tr);
        })
    }

//  Crea por cada cuota un <tr> y lo agrega al HTML
    cuotas.forEach(value => {
        if (contador === 1) {
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
    
            tdNCuota.textContent = value.numeroCuota;
            tdCapital.textContent = value.saldo;
            tdAmortizacion.textContent = value.amortizacion;
            tdIntereses.textContent = value.interes;
            tdCuota.textContent = value.cuota;
            tableBody.appendChild(tr);
        }
    })
});
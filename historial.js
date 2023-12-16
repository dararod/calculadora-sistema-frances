const TABLE_ELEMENT_HISTORY = document.getElementById("listaCuotasHistorial");

let datos = JSON.parse(localStorage.getItem("Valores"));
console.log(datos)

function mostrarCuotas(listaCuotas) {
    listaCuotas.forEach((value) => {
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
        tdCapital.textContent = value.saldo.toFixed(2);
        tdAmortizacion.textContent = value.amortizacion.toFixed(2);
        tdIntereses.textContent = value.interes.toFixed(2);
        tdCuota.textContent = value.cuota.toFixed(2);

        TABLE_ELEMENT_HISTORY.appendChild(tr);
    });
}

mostrarCuotas(datos)

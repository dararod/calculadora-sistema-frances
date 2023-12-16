const TABLE_ELEMENT_HISTORY = document.getElementById("listaCuotasHistorial");
const BOTON_ELIMINAR_CACHE = document.getElementById("eliminarCache");

BOTON_ELIMINAR_CACHE.addEventListener('click', (event) => {
    event.preventDefault();
    Swal.fire({
        title: "¿Estas seguro de que quieres eliminar el historial de cálculos?",
        text: "No podrás recuperar los cálculos luego de eliminar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("Valores");
            Swal.fire({
                title: "Eliminado!",
                text: "Tu historial de calculos ha sido eliminado",
                icon: "success"
            });
        }
    });
})
let datos = JSON.parse(localStorage.getItem("Valores"));

function mostrarCuotasHistorial(listaCuotas) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    const thNc = document.createElement("th");
    const thCI = document.createElement("th");
    const thA = document.createElement("th");
    const thI = document.createElement("th");
    const thC = document.createElement("th");

    table.appendChild(thead);
    thead.appendChild(trHead);
    trHead.appendChild(thNc);
    trHead.appendChild(thCI);
    trHead.appendChild(thA);
    trHead.appendChild(thI);
    trHead.appendChild(thC);

    thNc.textContent = "Nº de Cuota";
    thCI.textContent = "Capital al inicio del período";
    thA.textContent = "Amortización";
    thI.textContent = "Intereses"
    thC.textContent = "Cuota";

    listaCuotas.forEach((value) => {
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const tdNCuota = document.createElement("td");
        const tdCapital = document.createElement("td");
        const tdAmortizacion = document.createElement("td");
        const tdIntereses = document.createElement("td");
        const tdCuota = document.createElement("td");

        table.appendChild(tbody);
        tbody.appendChild(tr);
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

    });
    TABLE_ELEMENT_HISTORY.appendChild(table);
}

mostrarCuotasHistorial(datos)

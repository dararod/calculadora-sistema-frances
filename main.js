// Toma los inputs del HTML 
const inputValorInicialPrestamo = document.getElementById("prestamo");
const inputTasaPactada = document.getElementById("tasa");
const inputCantidadCuotas = document.getElementById("cuotas");
const seccionComentarios = document.getElementById("seccionComentarios");

const LOCAL_STORAGE_KEY = "Valores";
const BOTON_ENVIAR_FORM = document.getElementById("button");
const TABLE_ELEMENT = document.getElementById("listaCuotas");

// const valorInicialPrestamo = inputValorInicialPrestamo.valueAsNumber;
// const tasaPactada = inputTasaPactada.valueAsNumber;
// const cantidadCuotas = inputCantidadCuotas.valueAsNumber;

function calcularCuota(prestamo, interes, cuotas) {
    return prestamo * interes / (1 - Math.pow((1 + interes), -cuotas));
}

function crearCuota(numeroCuota, interes, amortizacion, saldo, cuota) {
    return {
        numeroCuota,
        interes,
        amortizacion,
        saldo,
        cuota
    }
}

function generarListaCuotas(valorInicialPrestamo, cantidadCuotas, tasaPactada) {
    const tasa = tasaPactada / 100;
    const listaCuotas = [];
    const cuota = calcularCuota(valorInicialPrestamo, tasa, cantidadCuotas);

    let valorPrestamo = valorInicialPrestamo;

    for (let i = 0; i < cantidadCuotas; i++) {
        let valorInteres = valorPrestamo * (1 + tasa) - valorPrestamo;
        let valorAmortizacion = cuota - valorInteres;

        valorPrestamo -= valorAmortizacion;

        const tablaCuotas = crearCuota(i + 1, valorInteres, valorAmortizacion, valorPrestamo, cuota)

        listaCuotas.push(tablaCuotas);
    }

    return listaCuotas;
}

function guardarEnCache(listaCuotas) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listaCuotas));
}

function cargarDeCache() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return [];
}

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

        TABLE_ELEMENT.appendChild(tr);
    });
}

function limpiarTabla() {
    while (TABLE_ELEMENT.firstChild) {
        TABLE_ELEMENT.removeChild(TABLE_ELEMENT.firstChild);
    }
}

function calcularCuotasYMostrar() {
    const valorInicialPrestamo = inputValorInicialPrestamo.valueAsNumber;
    const tasaPactada = inputTasaPactada.valueAsNumber;
    const cantidadCuotas = inputCantidadCuotas.valueAsNumber;

    const cuotas = generarListaCuotas(valorInicialPrestamo, cantidadCuotas, tasaPactada);

    limpiarTabla();
    mostrarCuotas(cuotas);
    guardarEnCache(cuotas);

}

BOTON_ENVIAR_FORM.addEventListener('click', (event) => {
    event.preventDefault();
    calcularCuotasYMostrar();
    Toastify({
        text: "Su cuota se ha calculado satisfactioriamente",
        duration: 3000,
        newWindow: false,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #2980B9, #6DD5FA)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
});

window.addEventListener('load', () => {
    const cuotas = cargarDeCache();
    mostrarCuotas(cuotas);
});

function getUsuarios(done) {
    let url = 'https://jsonplaceholder.typicode.com/users'
    const users = fetch(url);

    users
        .then(response => response.json())
        .then(data => {
            done(data);
        })
}

getUsuarios(data => {
    console.log(data)
    data.forEach(usuarios => {
        const article = document.createRange().createContextualFragment(`
        <div class="h-32 p-4 my-10 rounded-md drop-shadow-md flex items-center w-[50%] bg-white">
        <div class="bg-cyan-600 rounded-full h-16 w-16">
            <img alt="">
        </div>
        <div class="pl-4 flex flex-col">
            <span class="absolute top-8 font-semibold">${usuarios.name}</span>
            <span class="font-light text-sm">${usuarios.email}</span>
            <p></p>
        </div>
    </div>
        `);
        seccionComentarios.append(article);
    })
})


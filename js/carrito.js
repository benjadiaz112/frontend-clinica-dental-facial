const productos = [
    { id: 1, nombre: "Limpieza dental", precio: 35000, imagen: "imagenes/limpieza.jpg", descripcion: "Eliminación de sarro y pulido dental." },
    { id: 2, nombre: "Blanqueamiento", precio: 120000, imagen: "imagenes/blanqueamiento.jpg", descripcion: "Tratamiento estético para aclarar el tono dental." },
    { id: 3, nombre: "Ortodoncia", precio: 800000, imagen: "imagenes/ortodoncia.jpg", descripcion: "Evaluación y tratamiento para alinear la sonrisa." }
];

let carrito = JSON.parse(localStorage.getItem("carritoClinicaAura")) || [];

function guardarCarrito() {
    localStorage.setItem("carritoClinicaAura", JSON.stringify(carrito));
    actualizarContadores();
}

function agregarAlCarrito(id) {
    const producto = productos.find(function (item) { return item.id === id; });
    const existente = carrito.find(function (item) { return item.id === id; });
    if (existente) existente.cantidad += 1;
    else carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    guardarCarrito();
    actualizarVistaCarrito();

    const aviso = document.getElementById("aviso-carrito");
    if (aviso) aviso.textContent = producto.nombre + " fue agregado al pedido.";
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(function (item) { return item.id !== id; });
    guardarCarrito();
    actualizarVistaCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarVistaCarrito();
}

function mostrarProductos() {
    const catalogo = document.getElementById("catalogo-servicios");
    if (!catalogo) return;

    catalogo.innerHTML = productos.map(function (producto) {
        return `<article class="tarjeta-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="contenido-tarjeta">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
                <button class="btn" type="button" data-producto="${producto.id}">Agregar al pedido</button>
            </div>
        </article>`;
    }).join("");

    catalogo.querySelectorAll("[data-producto]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            agregarAlCarrito(Number(boton.dataset.producto));
        });
    });
}

function actualizarVistaCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-carrito");
    if (!lista) return;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu pedido está vacío.</p>";
        if (totalElemento) totalElemento.textContent = "$0";
        return;
    }

    let total = 0;
    lista.innerHTML = carrito.map(function (item) {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        return `<div class="item-carrito">
            <span><strong>${item.nombre}</strong><br>${item.cantidad} × $${item.precio.toLocaleString("es-CL")}</span>
            <span>$${subtotal.toLocaleString("es-CL")} <button class="btn-eliminar" type="button" data-eliminar="${item.id}" aria-label="Eliminar ${item.nombre}">×</button></span>
        </div>`;
    }).join("");

    lista.querySelectorAll("[data-eliminar]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            eliminarDelCarrito(Number(boton.dataset.eliminar));
        });
    });
    if (totalElemento) totalElemento.textContent = "$" + total.toLocaleString("es-CL");
}

function actualizarContadores() {
    const cantidad = carrito.reduce(function (suma, item) { return suma + item.cantidad; }, 0);
    document.querySelectorAll(".contador-carrito").forEach(function (contador) {
        contador.textContent = cantidad;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarProductos();
    actualizarVistaCarrito();
    actualizarContadores();
    const botonVaciar = document.getElementById("vaciar-carrito");
    if (botonVaciar) botonVaciar.addEventListener("click", vaciarCarrito);
});

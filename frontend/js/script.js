const formulario = document.getElementById("formulario");
const serviciosPermitidos = [
    "Odontología general",
    "Limpieza dental",
    "Blanqueamiento dental",
    "Ortodoncia",
    "Armonización facial"
];

if (formulario) {
    formulario.addEventListener("submit", validarFormulario);
    formulario.addEventListener("reset", limpiarMensajes);
    recuperarServicio();
}

function seleccionarServicio(servicio) {
    try {
        localStorage.setItem("servicioSeleccionado", servicio);
    } catch (error) {
    }
}

function recuperarServicio() {
    try {
        const servicio = localStorage.getItem("servicioSeleccionado");
        if (serviciosPermitidos.indexOf(servicio) >= 0) {
            document.getElementById("servicio").value = servicio;
        }
        localStorage.removeItem("servicioSeleccionado");
    } catch (error) {
    }
}

function validarFormulario(evento) {
    evento.preventDefault();
    limpiarMensajes();

    const nombre = document.getElementById("nombre").value.trim();
    const rut = document.getElementById("rut").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const servicio = document.getElementById("servicio").value;
    let esValido = true;

    if (!validarNombre(nombre)) {
        mostrarError("nombre", "Escribe tu nombre con letras, espacios, guiones o apóstrofes (mínimo 3 caracteres).");
        esValido = false;
    } else {
        marcarCorrecto("nombre");
    }

    if (!validarRut(rut)) {
        mostrarError("rut", "Escribe un RUT válido. Ejemplo: 12.345.678-5.");
        esValido = false;
    } else {
        marcarCorrecto("rut");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarError("correo", "Escribe un correo válido.");
        esValido = false;
    } else {
        marcarCorrecto("correo");
    }

    if (serviciosPermitidos.indexOf(servicio) === -1) {
        mostrarError("servicio", "Selecciona un servicio.");
        esValido = false;
    } else {
        marcarCorrecto("servicio");
    }

    const resultado = document.getElementById("resultado");
    if (esValido) {
        resultado.textContent = "Datos válidos. Clínica ficticia.";
        resultado.className = "correcto";
    } else {
        resultado.textContent = "Revisa los datos marcados.";
        resultado.className = "incorrecto";
        document.querySelector('[aria-invalid="true"]').focus();
    }
}

function mostrarError(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
    document.getElementById(campo).classList.add("incorrecto");
    document.getElementById(campo).setAttribute("aria-invalid", "true");
}

function marcarCorrecto(campo) {
    document.getElementById(campo).classList.add("correcto");
    document.getElementById(campo).setAttribute("aria-invalid", "false");
}

function limpiarMensajes() {
    document.querySelectorAll("form small").forEach(function (mensaje) {
        mensaje.textContent = "";
    });
    document.querySelectorAll("form input, form select, form textarea").forEach(function (campo) {
        campo.classList.remove("correcto", "incorrecto");
        campo.removeAttribute("aria-invalid");
    });
    const resultado = document.getElementById("resultado");
    resultado.textContent = "";
    resultado.className = "";
}

function validarNombre(nombre) {
    const patron = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
    return nombre.length >= 3 && nombre.length <= 80 && patron.test(nombre);
}

function validarRut(rut) {
    const normalizado = rut.trim().toUpperCase();
    const sinPuntos = /^[1-9]\d{6,7}-?[\dK]$/;
    const conPuntos = /^[1-9]\d{0,1}\.\d{3}\.\d{3}-[\dK]$/;
    if (!sinPuntos.test(normalizado) && !conPuntos.test(normalizado)) return false;

    const limpio = normalizado.replace(/\.|-/g, "");

    const cuerpo = limpio.slice(0, -1);
    const digito = limpio.slice(-1);
    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    let digitoCorrecto = String(resto);
    if (resto === 11) digitoCorrecto = "0";
    if (resto === 10) digitoCorrecto = "K";
    return digito === digitoCorrecto;
}

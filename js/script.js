const formulario = document.getElementById("formulario");

if (formulario) {
    formulario.addEventListener("submit", validarFormulario);
    formulario.addEventListener("reset", limpiarMensajes);
}

function validarFormulario(evento) {
    evento.preventDefault();
    limpiarMensajes();

    const nombre = document.getElementById("nombre").value.trim();
    const rut = document.getElementById("rut").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const servicio = document.getElementById("servicio").value;
    let esValido = true;

    if (nombre.length < 3) {
        mostrarError("nombre", "Escribe tu nombre completo.");
        esValido = false;
    }

    if (!validarRut(rut)) {
        mostrarError("rut", "Escribe un RUT válido. Ejemplo: 12.345.678-5.");
        esValido = false;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
        mostrarError("correo", "Escribe un correo válido.");
        esValido = false;
    }

    if (servicio === "") {
        mostrarError("servicio", "Selecciona un servicio.");
        esValido = false;
    }

    const resultado = document.getElementById("resultado");

    if (esValido) {
        resultado.textContent = "Solicitud enviada correctamente.";
        resultado.className = "correcto";
    } else {
        resultado.textContent = "Revisa los datos marcados.";
        resultado.className = "incorrecto";
    }
}

function mostrarError(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
}

function limpiarMensajes() {
    const mensajes = document.querySelectorAll("form small");

    mensajes.forEach(function (mensaje) {
        mensaje.textContent = "";
    });

    const resultado = document.getElementById("resultado");
    resultado.textContent = "";
    resultado.className = "";
}

function validarRut(rut) {
    const limpio = rut.replace(/\.|-/g, "").toUpperCase();

    if (limpio.length < 8) {
        return false;
    }

    const cuerpo = limpio.slice(0, -1);
    const digito = limpio.slice(-1);

    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

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

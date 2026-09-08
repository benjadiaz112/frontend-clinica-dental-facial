const dominios = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
const regiones = {
    "Arica y Parinacota": ["Arica", "Putre"], "Tarapacá": ["Iquique", "Alto Hospicio"],
    "Antofagasta": ["Antofagasta", "Calama"], "Atacama": ["Copiapó", "Vallenar"],
    "Coquimbo": ["La Serena", "Coquimbo"], "Valparaíso": ["Valparaíso", "Viña del Mar"],
    "Metropolitana": ["Santiago", "Providencia", "Maipú", "Puente Alto"],
    "O’Higgins": ["Rancagua", "San Fernando"], "Maule": ["Talca", "Curicó"],
    "Ñuble": ["Chillán", "San Carlos"], "Biobío": ["Concepción", "Los Ángeles"],
    "La Araucanía": ["Temuco", "Villarrica"], "Los Ríos": ["Valdivia", "La Unión"],
    "Los Lagos": ["Puerto Montt", "Osorno"], "Aysén": ["Coyhaique", "Aysén"],
    "Magallanes": ["Punta Arenas", "Puerto Natales"]
};

function correoValido(correo) {
    const dominio = correo.toLowerCase().split("@")[1];
    return correo.includes("@") && dominios.includes(dominio);
}

function runValido(run) {
    run = run.toUpperCase();
    if (!/^\d{6,8}[0-9K]$/.test(run)) return false;
    const cuerpo = run.slice(0, -1);
    const digito = run.slice(-1);
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    let correcto = String(resto);
    if (resto === 11) correcto = "0";
    if (resto === 10) correcto = "K";
    return digito === correcto;
}

function error(id, mensaje) {
    document.getElementById("error-" + id).textContent = mensaje;
    document.getElementById(id).classList.add("incorrecto");
}

function limpiar(formulario) {
    formulario.querySelectorAll("small").forEach(function (texto) { texto.textContent = ""; });
    formulario.querySelectorAll("input, select, textarea").forEach(function (campo) {
        campo.classList.remove("incorrecto");
    });
}

function cargarRegiones() {
    const region = document.getElementById("registro-region");
    const comuna = document.getElementById("registro-comuna");
    if (!region) return;

    for (const nombre in regiones) {
        region.innerHTML += `<option value="${nombre}">${nombre}</option>`;
    }

    region.addEventListener("change", function () {
        comuna.innerHTML = '<option value="">Selecciona una comuna</option>';
        comuna.disabled = region.value === "";
        if (region.value) {
            regiones[region.value].forEach(function (nombre) {
                comuna.innerHTML += `<option>${nombre}</option>`;
            });
        }
    });
}

function registrar(evento) {
    evento.preventDefault();
    limpiar(evento.target);

    const run = document.getElementById("registro-run").value.trim().toUpperCase();
    const nombre = document.getElementById("registro-nombre").value.trim();
    const apellidos = document.getElementById("registro-apellidos").value.trim();
    const correo = document.getElementById("registro-correo").value.trim().toLowerCase();
    const clave = document.getElementById("registro-clave").value;
    const region = document.getElementById("registro-region").value;
    const comuna = document.getElementById("registro-comuna").value;
    const direccion = document.getElementById("registro-direccion").value.trim();
    const resultado = document.getElementById("resultado-registro");
    let valido = true;

    if (!runValido(run)) { error("registro-run", "RUN inválido."); valido = false; }
    if (!nombre || nombre.length > 50) { error("registro-nombre", "Nombre requerido, máximo 50 caracteres."); valido = false; }
    if (!apellidos || apellidos.length > 100) { error("registro-apellidos", "Apellidos requeridos, máximo 100 caracteres."); valido = false; }
    if (!correoValido(correo) || correo.length > 100) { error("registro-correo", "Usa un correo permitido."); valido = false; }
    if (clave.length < 4 || clave.length > 10) { error("registro-clave", "Debe tener entre 4 y 10 caracteres."); valido = false; }
    if (!region) { error("registro-region", "Selecciona una región."); valido = false; }
    if (!comuna) { error("registro-comuna", "Selecciona una comuna."); valido = false; }
    if (!direccion || direccion.length > 300) { error("registro-direccion", "Dirección requerida, máximo 300 caracteres."); valido = false; }
    if (!valido) return;

    const usuarios = JSON.parse(localStorage.getItem("usuariosClinicaAura")) || [];
    const repetido = usuarios.some(function (usuario) {
        return usuario.run === run || usuario.correo === correo;
    });
    if (repetido) {
        resultado.textContent = "El RUN o correo ya está registrado.";
        resultado.className = "incorrecto";
        return;
    }

    usuarios.push({ run, nombre, apellidos, correo, clave, region, comuna, direccion });
    localStorage.setItem("usuariosClinicaAura", JSON.stringify(usuarios));
    resultado.textContent = "Cuenta creada correctamente.";
    resultado.className = "correcto";
    evento.target.reset();
    document.getElementById("registro-comuna").disabled = true;
}

function ingresar(evento) {
    evento.preventDefault();
    limpiar(evento.target);
    const correo = document.getElementById("login-correo").value.trim().toLowerCase();
    const clave = document.getElementById("login-clave").value;
    const resultado = document.getElementById("resultado-login");

    if (!correoValido(correo) || correo.length > 100) error("login-correo", "Usa un correo permitido.");
    if (clave.length < 4 || clave.length > 10) error("login-clave", "Debe tener entre 4 y 10 caracteres.");
    if (!correoValido(correo) || clave.length < 4 || clave.length > 10) return;

    const usuarios = JSON.parse(localStorage.getItem("usuariosClinicaAura")) || [];
    const usuario = usuarios.find(function (dato) {
        return dato.correo === correo && dato.clave === clave;
    });

    if (usuario) {
        localStorage.setItem("sesionClinicaAura", JSON.stringify(usuario));
        resultado.textContent = "Bienvenido, " + usuario.nombre + ".";
        resultado.className = "correcto";
    } else {
        resultado.textContent = "Correo o contraseña incorrectos.";
        resultado.className = "incorrecto";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    cargarRegiones();
    const registro = document.getElementById("form-registro");
    const login = document.getElementById("form-login");
    if (registro) registro.addEventListener("submit", registrar);
    if (login) login.addEventListener("submit", ingresar);
});

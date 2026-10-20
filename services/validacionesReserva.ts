export function validarNombre(nombre: string) {
  const limpio = nombre.trim();
  const patron = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
  return limpio.length >= 3 && limpio.length <= 80 && patron.test(limpio);
}

export function validarRut(rut: string) {
  const normalizado = rut.trim().toUpperCase();
  const sinPuntos = /^[1-9]\d{6,7}-?[\dK]$/;
  const conPuntos = /^[1-9]\d{0,1}\.\d{3}\.\d{3}-[\dK]$/;
  if (!sinPuntos.test(normalizado) && !conPuntos.test(normalizado)) return false;

  const limpio = normalizado.replace(/\.|-/g, "");
  const cuerpo = limpio.slice(0, -1);
  const digito = limpio.slice(-1);
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

export function validarCorreo(correo: string) {
  const limpio = correo.trim();
  return limpio.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio);
}

export function validarServicio(servicio: string, serviciosPermitidos: string[]) {
  return servicio !== "" && serviciosPermitidos.indexOf(servicio) >= 0;
}

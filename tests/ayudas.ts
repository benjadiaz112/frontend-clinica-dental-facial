import { act } from "react";

// Simula la respuesta y sus datos, sin conectarse al servidor.
export function respuestaJson(datos: unknown, estado = 200) {
  const respuesta = new Response(null, { status: estado });
  respuesta.json = async function () { return datos; };
  return respuesta;
}

// Espera a que React actualice la pantalla después del clic.
export async function hacerClic(boton: HTMLButtonElement) {
  await act(async function () {
    boton.click();
  });
}

export async function escribirCampo(
  campo: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  valor: string
) {
  await act(async function () {
    if (campo instanceof HTMLSelectElement) {
      campo.value = valor;
      campo.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }

    // React registra el valor anterior. Usamos el setter del navegador
    // para simular una entrada nueva que onChange pueda detectar.
    const tipo = campo instanceof HTMLTextAreaElement ? HTMLTextAreaElement : HTMLInputElement;
    const asignarValor = Object.getOwnPropertyDescriptor(tipo.prototype, "value")?.set;
    if (!asignarValor) throw new Error("No se puede escribir en este campo.");
    asignarValor.call(campo, valor);
    campo.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

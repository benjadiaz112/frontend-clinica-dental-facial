import FormularioCita from "@/components/reserva/FormularioCita";

export const metadata = { title: "Reserva | Clínica Aura" };

export default async function Pagina({ searchParams }) {
  const { tratamiento } = await searchParams;
  return <FormularioCita inicial={typeof tratamiento === "string" ? tratamiento : ""} />;
}

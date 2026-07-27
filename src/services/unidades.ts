import { supabase } from "@/lib/supabase";
import { Unidade } from "@/types/unidade";

export async function buscarUnidades() {
  const { data, error } = await supabase
    .from("unidades")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw error;
  }

  return data;
}

export async function buscarUnidadePorId(
  id: number
): Promise<Unidade | null> {
  const { data, error } = await supabase
    .from("unidades")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    nome: data.nome,
    tipo: data.tipo,
    endereco: data.endereco,

    latitude: data.latitude,
    longitude: data.longitude,

    distancia: data.distancia,
    espera: data.espera,

    status: data.status as Unidade["status"],
  };
}
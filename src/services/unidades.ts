import { supabase } from "@/lib/supabase";
import { Unidade } from "@/types/unidade";

export async function buscarUnidades(): Promise<Unidade[]> {
  const { data, error } = await supabase
    .from("unidades")
    .select("*")
    .eq("ativa", true)
    .order("nome");

  if (error) throw error;

  return (data ?? []).map((u: any) => ({
    id: u.id,
    nome: u.nome,
    tipo: u.tipo,
    endereco: u.endereco,

    bairro: u.bairro,
    cidade: u.cidade,
    estado: u.estado,

    telefone: u.telefone,
    funcionamento: u.funcionamento,
    especialidades: u.especialidades,

    abrangencia: u.abrangencia,
    bairros_atendidos: u.bairros_atendidos ?? [],

    latitude: u.latitude,
    longitude: u.longitude,

    espera: u.espera,
    status: u.status,

    ativa: u.ativa,

    // será recalculada depois
    distancia: 0,
  }));
}

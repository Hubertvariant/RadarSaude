import { supabase } from "@/lib/supabase";
import { Triagem } from "@/types/triagem";

export async function enviarTriagem(triagem: Triagem) {
  const { data, error } = await supabase
    .from("triagens")
    .insert({
      unidade_id: triagem.unidadeId,
      estado_geral: triagem.estadoGeral,
      sintoma: triagem.sintoma,
      tempo_sintoma: triagem.tempoSintoma,
      intensidade: triagem.intensidade,
      alergias: triagem.alergias,
      observacoes: triagem.observacoes,
    })
    .select();

  if (error) {
    throw error;
  }

  return data;
}

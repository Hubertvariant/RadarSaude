import { supabase } from "@/lib/supabase";

export interface Triagem {
  unidadeId: number;

  estadoGeral: string;

  sintoma: string;

  tempoSintoma: string;

  intensidade: number;

  alergias: string;

  observacoes: string;
}


export async function enviarTriagem(
  dados: Triagem
) {

  const { data, error } = await supabase
    .from("triagens")
    .insert({
      unidade_id: dados.unidadeId,

      estado_geral: dados.estadoGeral,

      sintoma: dados.sintoma,

      tempo_sintoma: dados.tempoSintoma,

      intensidade: dados.intensidade,

      alergias: dados.alergias,

      observacoes: dados.observacoes,
    })
    .select();


  if (error) {
    throw error;
  }


  return data;
}
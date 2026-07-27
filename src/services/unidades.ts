import { supabase } from "@/lib/supabase";
import { Unidade } from "@/types/unidade";

export async function buscarUnidades(): Promise<Unidade[]> {
  const { data, error } = await supabase
    .from("unidades")
    .select("*")
    .order("espera", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Unidade[];
}

export interface Unidade {
  id: number;

  nome: string;

  tipo: "UBS" | "Postinho" | "PA18" | "UPA" | "Hospital";

  endereco: string;

  bairro: string;

  cidade: string;

  estado: string;

  telefone?: string;

  funcionamento?: string;

  especialidades?: string[];

  abrangencia: "bairro" | "regional" | "municipal";

  bairros_atendidos: string[];

  distancia: number;

  espera: number;

  status: "verde" | "amarelo" | "vermelho";

  latitude: number;

  longitude: number;

  ativa?: boolean;

 chegada?: number;

 total?: number;
}

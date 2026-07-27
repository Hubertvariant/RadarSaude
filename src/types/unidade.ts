export interface Unidade {
  id: number;

  nome: string;

  tipo: string;

  endereco: string;

  latitude: number;

  longitude: number;

  distancia: number;

  espera: number;

  status: "verde" | "amarelo" | "vermelho";
}

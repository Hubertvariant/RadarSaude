import { Unidade } from "@/types/unidade";

export const unidades: Unidade[] = [
  {
    id: 1,
    nome: "UPA Central",
    tipo: "UPA",
    endereco: "Av. Brasil, 1250",

    latitude: -23.4197,
    longitude: -51.4246,

    distancia: 1.2,

    espera: 12,

    status: "verde",
  },

  {
    id: 2,
    nome: "UBS Vila Nova",
    tipo: "UBS",
    endereco: "Rua das Flores, 320",

    latitude: -23.4260,
    longitude: -51.4280,

    distancia: 2.8,

    espera: 28,

    status: "amarelo",
  },

  {
    id: 3,
    nome: "Hospital Municipal",
    tipo: "Hospital",
    endereco: "Rua Paraná, 900",

    latitude: -23.4140,
    longitude: -51.4180,

    distancia: 4.1,

    espera: 75,

    status: "vermelho",
  },
];

export const FILTROS = [
  "Todos",
  "UPA",
  "UBS",
  "Hospital",
] as const;

export type Filtro = (typeof FILTROS)[number];

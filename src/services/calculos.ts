export function calcularDistancia(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((R * c).toFixed(1));
}

export function calcularTempoChegada(distancia: number) {
  const velocidadeMedia = 30; // km/h

  return Math.max(
    1,
    Math.round((distancia / velocidadeMedia) * 60)
  );
}

export function calcularTempoTotal(
  espera: number,
  chegada: number
) {
  return espera + chegada;
}

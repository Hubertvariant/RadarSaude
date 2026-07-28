export function calcularDistanciaGPS(
  latUsuario: number,
  lonUsuario: number,
  latUnidade: number,
  lonUnidade: number
) {
  const R = 6371;

  const dLat = ((latUnidade - latUsuario) * Math.PI) / 180;
  const dLon = ((lonUnidade - lonUsuario) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latUsuario * Math.PI) / 180) *
      Math.cos((latUnidade * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

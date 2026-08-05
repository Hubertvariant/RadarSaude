import { View } from "react-native";
import { Map, Marker } from "pigeon-maps";
import { router } from "expo-router";

import { Unidade } from "@/types/unidade";

interface UnidadeCalculada extends Unidade {
  chegada?: number;
  total?: number;
}

interface Props {
  unidades: UnidadeCalculada[];
}

function corMarker(status: Unidade["status"]) {
  switch (status) {
    case "verde":
      return "#22C55E";
    case "amarelo":
      return "#FACC15";
    case "vermelho":
      return "#EF4444";
    default:
      return "#3B82F6";
  }
}

export default function MapContainer({ unidades }: Props) {
  const primeira = unidades[0];

  const centerDefault: [number, number] = [
    primeira?.latitude ?? -23.4197,
    primeira?.longitude ?? -51.4246,
  ];

  function abrirDetalhes(unidade: UnidadeCalculada) {
    const chegada = unidade.chegada ?? 0;
    const total = unidade.total ?? unidade.espera;

    router.push({
      pathname: `/unidade/${unidade.id}`,
      params: {
        chegada: String(chegada),
        total: String(total),
      },
    });
  }

  return (
    <View className="mx-5 mt-4 flex-1 overflow-hidden rounded-3xl min-h-[300px]">
      <Map
        defaultCenter={centerDefault}
        defaultZoom={13}
      >
        {unidades.map((unidade) => (
          <Marker
            key={unidade.id}
            width={35}
            anchor={[unidade.latitude, unidade.longitude]}
            color={corMarker(unidade.status)}
            onClick={() => abrirDetalhes(unidade)}
          />
        ))}
      </Map>
    </View>
  );
}

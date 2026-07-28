import { useState } from "react";
import { View, Text } from "react-native";
import { Map, Marker } from "pigeon-maps";

import BottomSheetUnidade from "@/components/BottomSheetUnidade";
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
  const [selecionada, setSelecionada] = useState<UnidadeCalculada | null>(null);

  const primeira = unidades[0];

  // Coordenadas padrão caso não tenha nenhuma unidade
  const centerDefault: [number, number] = [
    primeira?.latitude ?? -23.4197,
    primeira?.longitude ?? -51.4246,
  ];

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
            onClick={() => setSelecionada(unidade)}
          />
        ))}
      </Map>

      {selecionada && (
        <BottomSheetUnidade
          unidade={selecionada}
          onClose={() => setSelecionada(null)}
        />
      )}
    </View>
  );
}

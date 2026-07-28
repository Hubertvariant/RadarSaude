import { useState } from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { View } from "react-native";

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

export default function MapContainer({
  unidades,
}: Props) {
  const [selecionada, setSelecionada] =
    useState<UnidadeCalculada | null>(null);

  const primeira = unidades[0];

  return (
    <View className="mx-5 mt-4 flex-1 overflow-hidden rounded-3xl">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          latitude: primeira?.latitude ?? -23.4197,
          longitude: primeira?.longitude ?? -51.4246,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {unidades.map((unidade) => (
          <Marker
            key={unidade.id}
            coordinate={{
              latitude: unidade.latitude,
              longitude: unidade.longitude,
            }}
            title={unidade.nome}
            description={`Tempo total: ${
              unidade.total ?? unidade.espera
            } min`}
            pinColor={corMarker(unidade.status)}
            onPress={() => setSelecionada(unidade)}
          />
        ))}
      </MapView>

      {selecionada && (
        <BottomSheetUnidade
          unidade={selecionada}
          onClose={() => setSelecionada(null)}
        />
      )}
    </View>
  );
}

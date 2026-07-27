import { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View } from "react-native";

import BottomSheetUnidade from "@/components/BottomSheetUnidade";
import FloatingButtons from "@/components/FloatingButtons";

import { unidades } from "@/data/unidades";
import { Unidade } from "@/types/unidade";

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

export default function MapContainer() {
  const [selecionada, setSelecionada] = useState<Unidade | null>(null);


  return (
    <View className="mx-5 mt-4 flex-1 overflow-hidden rounded-3xl">

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          latitude: -23.4197,
          longitude: -51.4246,
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
            description={`Espera: ${unidade.espera} minutos`}
            pinColor={corMarker(unidade.status)}
            onPress={() => setSelecionada(unidade)}
          />
        ))}
      </MapView>

      <FloatingButtons />

      {selecionada && (
        <BottomSheetUnidade
          unidade={selecionada}
          onClose={() => setSelecionada(null)}
        />
      )}

    </View>
  );
}

import { router } from "expo-router";
import {
  Clock3,
  MapPin,
  Navigation,
  X,
} from "lucide-react-native";
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Unidade } from "@/types/unidade";

interface Props {
  unidade: Unidade;
  onClose: () => void;
}

export default function BottomSheetUnidade({
  unidade,
  onClose,
}: Props) {
  function abrirGoogleMaps() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${unidade.latitude},${unidade.longitude}`;

    Linking.openURL(url);
  }

  function iniciarTriagem() {
    router.push({
      pathname: "/triagem",
      params: {
        unidadeId: unidade.id,
      },
    });
  }

  return (
    <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-2xl">

      {/* fechar */}

      <TouchableOpacity
        onPress={onClose}
        className="absolute right-5 top-5"
      >
        <X
          size={24}
          color="#475569"
        />
      </TouchableOpacity>

      {/* Nome */}

      <Text className="text-2xl font-bold text-slate-900">
        {unidade.nome}
      </Text>

      <Text className="mt-1 text-slate-500">
        {unidade.tipo}
      </Text>

      {/* Espera */}

      <View className="mt-6 flex-row items-center">

        <Clock3
          size={20}
          color="#0284C7"
        />

        <Text className="ml-3 text-base text-slate-700">
          Espera aproximada: {unidade.espera} min
        </Text>

      </View>

      {/* Distância */}

      <View className="mt-4 flex-row items-center">

        <MapPin
          size={20}
          color="#0284C7"
        />

        <Text className="ml-3 text-base text-slate-700">
          {unidade.distancia} km
        </Text>

      </View>

      {/* Botões */}

      <TouchableOpacity
        onPress={abrirGoogleMaps}
        className="mt-8 flex-row items-center justify-center rounded-2xl bg-sky-600 py-4"
      >

        <Navigation
          size={20}
          color="white"
        />

        <Text className="ml-3 text-lg font-bold text-white">
          Iniciar rota
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={iniciarTriagem}
        className="mt-4 rounded-2xl border border-sky-600 py-4"
      >

        <Text className="text-center text-lg font-bold text-sky-600">
          Fazer pré-triagem
        </Text>

      </TouchableOpacity>

    </View>
  );
}

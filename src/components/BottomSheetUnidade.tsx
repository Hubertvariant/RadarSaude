import { router } from "expo-router";
import {
  Car,
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

interface UnidadeCalculada extends Unidade {
  chegada?: number;
  total?: number;
}

interface Props {
  unidade: UnidadeCalculada;
  onClose: () => void;
}

export default function BottomSheetUnidade({
  unidade,
  onClose,
}: Props) {
  const chegada = unidade.chegada ?? 0;
  const total = unidade.total ?? unidade.espera;

  function abrirGoogleMaps() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${unidade.latitude},${unidade.longitude}`
    );
  }

  function iniciarTriagem() {
    router.push({
      pathname: "/triagem",
      params: {
        unidadeId: String(unidade.id),
        unidadeNome: unidade.nome,
        espera: String(unidade.espera),
        chegada: String(chegada),
        total: String(total),
      },
    });
  }

  function abrirDetalhes() {
    router.push({
      pathname: `/unidade/${unidade.id}`,
      params: {
        chegada: String(chegada),
        total: String(total),
      },
    });
  }

  return (
    <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-2xl">

      {/* Fechar */}

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

      {/* Informações */}

      <View className="mt-6">

        <View className="flex-row items-center">
          <Clock3
            size={20}
            color="#0284C7"
          />

          <Text className="ml-3 text-base text-slate-700">
            Espera: {unidade.espera} min
          </Text>
        </View>

        <View className="mt-4 flex-row items-center">
          <Car
            size={20}
            color="#22C55E"
          />

          <Text className="ml-3 text-base text-slate-700">
            Chegada: {chegada} min
          </Text>
        </View>

        <View className="mt-4 flex-row items-center">
          <MapPin
            size={20}
            color="#0284C7"
          />

          <Text className="ml-3 text-base text-slate-700">
            {unidade.distancia.toFixed(1)} km
          </Text>
        </View>

      </View>

      {/* Tempo Total */}

      <View className="mt-6 rounded-2xl bg-sky-50 p-4">
        <Text className="text-center text-lg font-bold text-sky-700">
          Atendimento estimado em {total} minutos
        </Text>
      </View>

      {/* Botões */}

      <TouchableOpacity
        onPress={abrirGoogleMaps}
        className="mt-6 flex-row items-center justify-center rounded-2xl bg-sky-600 py-4"
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
        onPress={abrirDetalhes}
        className="mt-4 rounded-2xl border border-slate-300 py-4"
      >
        <Text className="text-center text-lg font-bold text-slate-700">
          Ver detalhes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={iniciarTriagem}
        className="mt-4 rounded-2xl bg-emerald-600 py-4"
      >
        <Text className="text-center text-lg font-bold text-white">
          Fazer pré-triagem
        </Text>
      </TouchableOpacity>

    </View>
  );
}

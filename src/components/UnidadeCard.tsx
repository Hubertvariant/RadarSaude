import { router } from "expo-router";
import {
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { STATUS } from "@/lib/status";

import { Unidade } from "@/types/unidade";

interface Props {
  unidade: Unidade;
}

export default function UnidadeCard({ unidade }: Props) {

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push(`/unidade/${unidade.id}`)
      }
      className="mb-4 rounded-3xl bg-white p-5"
    >
      <View className="flex-row items-center justify-between">

        <View className="flex-1">

          <Text className="text-xl font-bold text-slate-900">
            {unidade.nome}
          </Text>

          <Text className="mt-1 text-slate-500">
            {unidade.tipo}
          </Text>

        </View>

        <ChevronRight color="#94A3B8" />

      </View>

      <View className="mt-5 flex-row items-center">

        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: STATUS[unidade.status].cor,
          }}
        />

        <Text className="ml-2 font-semibold">
          {STATUS[unidade.status].texto}
        </Text>

      </View>

      <View className="mt-5 flex-row justify-between">

        <View className="flex-row items-center">

          <Clock3
            size={18}
            color="#0EA5E9"
          />

          <Text className="ml-2 text-slate-700">
            {unidade.espera} min
          </Text>

        </View>

        <View className="flex-row items-center">

          <MapPin
            size={18}
            color="#0EA5E9"
          />

          <Text className="ml-2 text-slate-700">
            {unidade.distancia.toFixed(1)} km
          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
}

import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Navigation,
  ClipboardList,
} from "lucide-react-native";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { STATUS } from "@/lib/status";

import { unidades } from "@/data/unidades";

export default function UnidadeScreen() {
  const { id } = useLocalSearchParams();

  const unidade = unidades.find(
    (u) => u.id === Number(id)
  );

  if (!unidade) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Unidade não encontrada.</Text>
      </SafeAreaView>
    );
  }

  function abrirGoogleMaps() {
    const destino = encodeURIComponent(unidade.endereco);

    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${destino}`
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {/* HEADER */}

        <View className="flex-row items-center">

          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={26} />
          </TouchableOpacity>

          <Text className="ml-4 text-3xl font-bold">
            {unidade.nome}
          </Text>

        </View>

        {/* STATUS */}

        <View className="mt-8 rounded-3xl bg-white p-5">

          <View className="flex-row items-center">

            <View
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: STATUS[unidade.status].cor,
              }}
            />

            <Text className="ml-3 text-lg font-semibold">
              {STATUS[unidade.status].texto}
            </Text>

          </View>

        </View>

        {/* TEMPO */}

        <View className="mt-5 rounded-3xl bg-white p-5">

          <View className="flex-row items-center">

            <Clock3
              size={22}
              color="#0284C7"
            />

            <Text className="ml-3 text-lg font-semibold">
              Tempo de espera
            </Text>

          </View>

          <Text className="mt-3 text-3xl font-bold">
            {unidade.espera} min
          </Text>

        </View>

        {/* DISTÂNCIA */}

        <View className="mt-5 rounded-3xl bg-white p-5">

          <View className="flex-row items-center">

            <MapPin
              size={22}
              color="#0284C7"
            />

            <Text className="ml-3 text-lg font-semibold">
              Distância
            </Text>

          </View>

          <Text className="mt-3 text-3xl font-bold">
            {unidade.distancia.toFixed(1)} km
          </Text>

        </View>

        {/* ENDEREÇO */}

        <View className="mt-5 rounded-3xl bg-white p-5">

          <Text className="text-lg font-semibold">
            Endereço
          </Text>

          <Text className="mt-2 text-slate-600">
            {unidade.endereco}
          </Text>

        </View>

        {/* BOTÕES */}

        <TouchableOpacity
          onPress={abrirGoogleMaps}
          className="mt-8 flex-row items-center justify-center rounded-2xl bg-sky-600 py-4"
        >
          <Navigation
            size={22}
            color="white"
          />

          <Text className="ml-3 text-lg font-bold text-white">
            Iniciar rota
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/triagem",
              params: {
                unidadeId: unidade.id,
              },
            })
          }
          className="mt-4 flex-row items-center justify-center rounded-2xl bg-emerald-600 py-4"
        >
          <ClipboardList
            size={22}
            color="white"
          />

          <Text className="ml-3 text-lg font-bold text-white">
            Fazer pré-triagem
          </Text>

        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

import { router } from "expo-router";
import { ArrowLeft, Pencil } from "lucide-react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InfoCard from "@/components/InfoCard";
import { carregarUsuario } from "@/lib/storage";
import * as masks from "@/lib/masks";
import { Usuario } from "@/types/usuario";

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

useFocusEffect(
  useCallback(() => {
    async function carregar() {
      const dados = await carregarUsuario();
      setUsuario(dados);
    }

    carregar();
  }, [])
);

  if (!usuario) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">

      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 80,
        }}
      >

        {/* HEADER */}

        <View className="flex-row items-center">

          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft
              size={26}
              color="#0F172A"
            />
          </TouchableOpacity>

          <Text className="ml-4 text-3xl font-bold text-slate-900">
            Meu Perfil
          </Text>

        </View>

        {/* AVATAR */}

        <View className="mt-10 items-center">

          <View className="h-24 w-24 items-center justify-center rounded-full bg-sky-600">

            <Text className="text-4xl font-bold text-white">
              {usuario.nome.charAt(0).toUpperCase()}
            </Text>

          </View>

          <Text className="mt-4 text-2xl font-bold text-slate-900">
            {usuario.nome}
          </Text>

        </View>

        {/* DADOS */}

        <View className="mt-10 gap-4">

          <InfoCard
            titulo="CPF"
            valor={masks.ocultarCpf(usuario.cpf)}
          />

          <InfoCard
            titulo="Cartão SUS"
            valor={masks.ocultarSus(usuario.cartaoSus)}
          />

          <InfoCard
            titulo="Telefone"
            valor={usuario.telefone}
          />

          <InfoCard
            titulo="Contato de emergência"
            valor={usuario.contatoEmergencia}
          />

          <InfoCard
            titulo="Tipo sanguíneo"
            valor={usuario.tipoSanguineo}
          />

        </View>

        {/* EDITAR */}

        <TouchableOpacity
          className="mt-8 flex-row items-center justify-center rounded-2xl bg-sky-600 py-4"
          onPress={() =>
            router.push({
              pathname: "/meus-dados",
              params: {
                editar: "true",
              },
            })
          }
        >

          <Pencil
            size={18}
            color="white"
          />

          <Text className="ml-2 text-lg font-bold text-white">
            Editar Dados
          </Text>

        </TouchableOpacity>

        {/* SOBRE */}

        <View className="mt-10 rounded-2xl bg-white p-5">

          <Text className="font-semibold text-slate-900">
            Radar Saúde
          </Text>

          <Text className="mt-1 text-slate-500">
            Versão 1.0.0
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

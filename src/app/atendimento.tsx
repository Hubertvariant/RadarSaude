import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { buscarUnidades } from "@/services/unidades";
import { Unidade } from "@/types/unidade";

import FilterChips from "@/components/FilterChips";
import SearchBar from "@/components/SearchBar";
import UnidadeCard from "@/components/UnidadeCard";


export default function Atendimento() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarUnidades();
        setUnidades(dados);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar unidades.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 pt-2">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={26} />
          </TouchableOpacity>

          <Text className="ml-4 text-3xl font-bold">
            Atendimento
          </Text>
        </View>

        <SearchBar />

        <FilterChips />
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-slate-500">
            Carregando unidades...
          </Text>
        </View>
      ) : (
        <FlatList
          data={unidades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UnidadeCard unidade={item} />
          )}
          contentContainerStyle={{
            padding: 20,
            paddingTop: 10,
          }}
        />
      )}
    </SafeAreaView>
  );
}
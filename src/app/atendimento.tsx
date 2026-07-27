import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FilterChips from "@/components/FilterChips";
import SearchBar from "@/components/SearchBar";
import UnidadeCard from "@/components/UnidadeCard";

import { unidades } from "@/data/unidades";

export default function Atendimento() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">

      <View className="px-5 pt-2">

        <View className="flex-row items-center">

          <TouchableOpacity
            onPress={() => router.back()}
          >
            <ArrowLeft size={26} />
          </TouchableOpacity>

          <Text className="ml-4 text-3xl font-bold">
            Atendimento
          </Text>

        </View>

        <SearchBar />

        <FilterChips />

      </View>

      <FlatList
        data={unidades}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <UnidadeCard unidade={item} />
        )}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 10,
        }}
      />

    </SafeAreaView>
  );
}

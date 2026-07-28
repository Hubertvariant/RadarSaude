import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Clock3, Navigation } from "lucide-react-native";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MapContainer from "@/components/MapContainer";
import MapLegend from "@/components/MapLegend";
import FilterChips from "@/components/FilterChips";

import { buscarUnidades } from "@/services/unidades";
import {
  calcularTempoChegada,
  calcularTempoTotal,
} from "@/services/calculos";
import { calcularDistanciaGPS } from "@/lib/distance";
import { useLocation } from "@/hooks/useLocation";

import { Unidade } from "@/types/unidade";

export default function Home() {
  const { location } = useLocation();

  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [filtro, setFiltro] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarUnidades();

        if (!location) {
          setUnidades(dados);
          return;
        }

        const lista = dados
          .map((u) => {
            const distancia = calcularDistanciaGPS(
              location.latitude,
              location.longitude,
              u.latitude,
              u.longitude
            );

            const chegada = calcularTempoChegada(distancia);

            return {
              ...u,
              distancia,
              chegada,
              total: calcularTempoTotal(
                u.espera,
                chegada
              ),
            };
          })
          .sort((a, b) => a.total - b.total);

        setUnidades(lista);
      } catch (error) {
        console.error(error);
      }
    }

    carregar();
  }, [location]);

  const unidadesFiltradas =
    filtro === "Todos"
      ? unidades
      : unidades.filter((u) => u.tipo === filtro);

  const melhorUnidade = unidadesFiltradas[0];

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header com a função de abrir o menu */}
      <Header onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Conteúdo rolável sem se preocupar com barras presas no fundo */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {melhorUnidade && (
          <TouchableOpacity
            className="mx-5 mt-4 rounded-3xl bg-sky-600 p-5"
            activeOpacity={0.9}
            onPress={() =>
              router.push(`/unidade/${melhorUnidade.id}`)
            }
          >
            <Text className="text-white text-sm font-semibold">
              MELHOR OPÇÃO PARA VOCÊ
            </Text>

            <Text className="mt-2 text-2xl font-bold text-white">
              {melhorUnidade.nome}
            </Text>

            <Text className="mt-1 text-sky-100">
              {melhorUnidade.tipo}
            </Text>

            <View className="mt-5 flex-row justify-between">
              <View className="items-center">
                <Navigation
                  size={18}
                  color="white"
                />

                <Text className="mt-2 font-bold text-white">
                  {(melhorUnidade as any).chegada} min
                </Text>

                <Text className="text-xs text-sky-100">
                  Chegada
                </Text>
              </View>

              <View className="items-center">
                <Clock3
                  size={18}
                  color="white"
                />

                <Text className="mt-2 font-bold text-white">
                  {melhorUnidade.espera} min
                </Text>

                <Text className="text-xs text-sky-100">
                  Espera
                </Text>
              </View>

              <View className="items-center">
                <Text className="text-2xl font-bold text-white">
                  {(melhorUnidade as any).total}
                </Text>

                <Text className="text-xs text-sky-100">
                  Total (min)
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <MapLegend />

        <FilterChips
          ativo={filtro}
          onChange={setFiltro}
        />

        <MapContainer
          unidades={unidadesFiltradas}
        />
      </ScrollView>

      {/* Sidebar Lateral */}
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </SafeAreaView>
  );
}

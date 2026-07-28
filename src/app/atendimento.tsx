import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarUnidades } from "@/services/unidades";
import { Unidade } from "@/types/unidade";

import { calcularTempoChegada, calcularTempoTotal } from "@/services/calculos";

import { calcularDistanciaGPS } from "@/lib/distance";

import { useLocation } from "@/hooks/useLocation";

import FilterChips from "@/components/FilterChips";
import SearchBar from "@/components/SearchBar";
import UnidadeCard from "@/components/UnidadeCard";

export default function Atendimento() {
    const { location, loading: loadingLocation } = useLocation();
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("Todos");
    const [unidades, setUnidades] = useState<Unidade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await buscarUnidades();

                // Se ainda não temos a localização,
                // mostramos as unidades normalmente.
                if (!location) {
                    setUnidades(dados);
                    return;
                }

                // Calcula a distância real de cada unidade
                const lista = dados
                    .map((u) => {
                        const distancia = calcularDistanciaGPS(
                            location.latitude,
                            location.longitude,
                            u.latitude,
                            u.longitude,
                        );

                        const chegada = calcularTempoChegada(distancia);

                        return {
                            ...u,
                            distancia,
                            chegada,
                            total: calcularTempoTotal(u.espera, chegada),
                        };
                    })
                    .sort((a, b) => a.total - b.total);

                setUnidades(lista);
            } catch (error) {
                console.error(error);
                alert("Erro ao carregar unidades.");
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, [location]);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-slate-100">
                <View className="flex-1 items-center justify-center">
                    <Text className="text-slate-500">
                        {loadingLocation
                            ? "Obtendo localização..."
                            : "Carregando unidades..."}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const unidadesFiltradas = unidades.filter((u) => {
        const texto = busca.toLowerCase();

        const passouBusca =
            u.nome.toLowerCase().includes(texto) ||
            u.tipo.toLowerCase().includes(texto) ||
            u.endereco.toLowerCase().includes(texto) ||
            u.bairros_atendidos.some((bairro) =>
                bairro.toLowerCase().includes(texto),
            );

        const passouFiltro = filtro === "Todos" || u.tipo === filtro;

        return passouBusca && passouFiltro;
    });
    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            <View className="px-5 pt-2">
                {/* HEADER */}
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={26} />
                    </TouchableOpacity>

                    <Text className="ml-4 text-3xl font-bold">Atendimento</Text>
                </View>
                {/* BUSCA */}
                <SearchBar value={busca} onChangeText={setBusca} />
                {/* FILTROS */}
                <FilterChips ativo={filtro} onChange={setFiltro} />
            </View>

            <FlatList
                data={unidadesFiltradas}
                keyExtractor={(item) => item.id.toString()}
               renderItem={({ item, index }) => (
  <UnidadeCard
    unidade={item}
    recomendado={index === 0}
  />
)}
                contentContainerStyle={{
                    padding: 20,
                    paddingTop: 10,
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

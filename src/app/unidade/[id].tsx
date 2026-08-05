import { router, useLocalSearchParams } from "expo-router";
import {
    ArrowLeft,
    Clock3,
    MapPin,
    Navigation,
    ClipboardList,
    Car,
} from "lucide-react-native";
import {
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { STATUS } from "@/lib/status";
import { buscarUnidades } from "@/services/unidades";
import { Unidade } from "@/types/unidade";

import { useLocation } from "@/hooks/useLocation";

import { calcularTempoChegada, calcularTempoTotal } from "@/services/calculos";

import { calcularDistanciaGPS } from "@/lib/distance";

export default function UnidadeScreen() {
    const params = useLocalSearchParams();

    const id = Number(params.id);

    const { location } = useLocation();

    const [unidade, setUnidade] = useState<Unidade | null>(null);

    useEffect(() => {
        async function carregar() {
            const lista = await buscarUnidades();

            const encontrada = lista.find((u) => u.id === id);

            if (encontrada) {
                setUnidade(encontrada);
            }
        }

        carregar();
    }, [id]);

    if (!unidade) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text>Carregando unidade...</Text>
            </SafeAreaView>
        );
    }

    // ==========================
    // Cálculos
    // ==========================
    const distancia = location
        ? calcularDistanciaGPS(
            location.latitude,
            location.longitude,
            unidade.latitude,
            unidade.longitude,
        )
        : 0;

    const chegada = calcularTempoChegada(distancia);

    const total = calcularTempoTotal(unidade.espera, chegada);
    function abrirGoogleMaps() {
        Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&destination=${unidade.latitude},${unidade.longitude}`,
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

                    <Text className="ml-4 flex-1 text-3xl font-bold">{unidade.nome}</Text>
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
                {/* TEMPO ATÉ O ATENDIMENTO */}
                <View className="mt-5 rounded-3xl bg-sky-50 p-6">
                    <Text className="text-center text-xl font-semibold text-slate-700">
                        Tempo até o atendimento
                    </Text>

                    <Text className="mt-3 text-center text-5xl font-bold text-sky-600">
                        {total} min
                    </Text>

                    <Text className="mt-2 text-center text-sm text-slate-500">
                        Saindo agora, este é o tempo estimado até o atendimento.
                    </Text>

                    <View className="mt-8 border-t border-sky-200 pt-5">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Car size={22} color="#22C55E" />

                                <Text className="ml-3 text-lg text-slate-700">Percurso</Text>
                            </View>

                            <Text className="text-xl font-bold text-slate-900">
                                {chegada} min
                            </Text>
                        </View>

                        <View className="my-5 h-px bg-sky-200" />

                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Clock3 size={22} color="#0284C7" />

                                <Text className="ml-3 text-lg text-slate-700">Espera</Text>
                            </View>

                            <Text className="text-xl font-bold text-slate-900">
                                {unidade.espera} min
                            </Text>
                        </View>
                    </View>
                </View>{" "}
                {/* ROTA */}
                <TouchableOpacity
                    onPress={abrirGoogleMaps}
                    className="mt-8 flex-row items-center justify-center rounded-2xl bg-sky-600 py-4"
                >
                    <Navigation size={22} color="white" />

                    <Text className="ml-3 text-lg font-bold text-white">
                        Iniciar rota
                    </Text>
                </TouchableOpacity>
                {/* PRÉ-TRIAGEM */}
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/triagem",
                            params: {
                                unidadeId: String(unidade.id),
                                unidadeNome: unidade.nome,
                                espera: String(unidade.espera),
                                distancia: String(distancia),
                                chegada: String(chegada),
                                total: String(total),
                            },
                        })
                    }
                    className="mt-4 flex-row items-center justify-center rounded-2xl bg-emerald-600 py-4"
                >
                    <ClipboardList size={22} color="white" />

                    <Text className="ml-3 text-lg font-bold text-white">
                        Fazer pré-triagem
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

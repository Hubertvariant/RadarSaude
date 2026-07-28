import { router } from "expo-router";
import { ChevronRight, Clock3, Car, MapPin } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { STATUS } from "@/lib/status";
import { Unidade } from "@/types/unidade";

interface UnidadeCalculada extends Unidade {
    chegada?: number;
    total?: number;
}

interface Props {
    unidade: UnidadeCalculada;
    recomendado?: boolean;
}

export default function UnidadeCard({ unidade, recomendado = false }: Props) {
    const velocidadeMedia = 35;

    const chegada = Math.max(
        1,
        Math.round((unidade.distancia / velocidadeMedia) * 60),
    );

    const total = chegada + unidade.espera;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                router.push({
                    pathname: `/unidade/${unidade.id}`,
                    params: {
                        distancia: unidade.distancia.toFixed(1),
                        chegada: String(chegada),
                        total: String(total),
                    },
                })
            }
            className="mb-4 rounded-3xl bg-white p-5"
        >
            {recomendado && (
                <View className="mb-4 self-start rounded-full bg-emerald-500 px-3 py-1">
                    <Text className="font-bold text-white">⭐ Recomendado para você</Text>
                </View>
            )}
            <View className="flex-row items-center justify-between">
                <View className="flex-1">
                    <Text className="text-xl font-bold text-slate-900">
                        {unidade.nome}
                    </Text>

                    <Text className="mt-1 text-slate-500">{unidade.tipo}</Text>
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
                <View className="items-center">
                    <Clock3 size={18} color="#0EA5E9" />

                    <Text className="mt-1 font-semibold">{unidade.espera} min</Text>

                    <Text className="text-xs text-slate-500">Espera</Text>
                </View>

                <View className="items-center">
                    <Car size={18} color="#22C55E" />

                    <Text className="mt-1 font-semibold">{chegada} min</Text>

                    <Text className="text-xs text-slate-500">Chegada</Text>
                </View>

                <View className="items-center">
                    <MapPin size={18} color="#0284C7" />

                    <Text className="mt-1 font-semibold">
                        {unidade.distancia.toFixed(1)} km
                    </Text>

                    <Text className="text-xs text-slate-500">Distância</Text>
                </View>
            </View>

            <View className="mt-5 rounded-2xl bg-sky-50 p-3">
                <Text className="text-center text-base font-bold text-sky-700">
                    Tempo total estimado: {total} minutos
                </Text>
            </View>
        </TouchableOpacity>
    );
}

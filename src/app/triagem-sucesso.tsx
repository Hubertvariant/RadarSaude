import { router, useLocalSearchParams } from "expo-router";
import { CircleCheckBig, Clock3, House, MapPin } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, TouchableOpacity, View } from "react-native";

import { unidades } from "@/data/unidades";

export default function TriagemSucesso() {
    const { unidadeId } = useLocalSearchParams<{
        unidadeId: string;
    }>();

    const unidade = unidades.find((u) => u.id === Number(unidadeId));

    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            <View className="flex-1 justify-center px-6">
                <View className="items-center">
                    <View className="h-28 w-28 items-center justify-center rounded-full bg-green-100">
                        <CircleCheckBig size={72} color="#22C55E" />
                    </View>

                    <Text className="mt-8 text-center text-3xl font-bold text-slate-900">
                        Pré-triagem enviada!
                    </Text>

                    <Text className="mt-4 text-center text-base text-slate-500">
                        Sua ficha foi enviada com sucesso.
                    </Text>
                </View>

                {/* CARD */}

                <View className="mt-10 rounded-3xl bg-white p-6">
                    <View className="flex-row items-center">
                        <MapPin size={22} color="#0284C7" />

                        <Text className="ml-3 text-lg font-semibold text-slate-900">
                            {unidade?.nome ?? "Unidade de Saúde"}
                        </Text>
                    </View>

                    <View className="mt-6 flex-row items-center">
                        <Clock3 size={22} color="#0284C7" />

                        <Text className="ml-3 text-base text-slate-700">
                            Tempo estimado de espera
                        </Text>
                    </View>

                    <Text className="mt-2 text-3xl font-bold text-sky-600">
                        {unidade?.espera ?? "--"} minutos
                    </Text>

                    <View className="mt-8 rounded-2xl bg-sky-50 p-4">
                        <Text className="text-center text-slate-700">
                            Ao chegar na unidade, informe que sua pré-triagem foi realizada
                            pelo aplicativo.
                        </Text>
                    </View>
                </View>

                {/* BOTÃO */}

                <TouchableOpacity
                    onPress={() => router.replace("/")}
                    className="mt-10 flex-row items-center justify-center rounded-2xl bg-sky-600 py-4"
                >
                    <House size={22} color="white" />

                    <Text className="ml-3 text-lg font-bold text-white">
                        Voltar para o início
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

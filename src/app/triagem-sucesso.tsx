import { router, useLocalSearchParams } from "expo-router";
import {
    CircleCheckBig,
    House,
    MapPin,
    Navigation,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";

export default function TriagemSucesso() {

    const params = useLocalSearchParams<{
        unidadeId: string;
        unidadeNome: string;
        chegada: string;
        espera: string;
        total: string;
    }>();

    const unidadeNome = String(params.unidadeNome ?? "Unidade de Saúde");

    const chegada = Number(params.chegada ?? 0);
    const espera = Number(params.espera ?? 0);
    const total = Number(params.total ?? 0);

    return (
        <SafeAreaView className="flex-1 bg-slate-100">

            <View className="flex-1 justify-center px-6">

                {/* SUCESSO */}

                <View className="items-center">

                    <View className="h-28 w-28 items-center justify-center rounded-full bg-green-100">
                        <CircleCheckBig
                            size={72}
                            color="#22C55E"
                        />
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

                        <MapPin
                            size={22}
                            color="#0284C7"
                        />

                        <Text className="ml-3 text-lg font-semibold">
                            {unidadeNome}
                        </Text>

                    </View>

                    <View className="mt-8">

                        <View className="flex-row justify-between">

                            <Text className="text-slate-500">
                                Tempo até chegar
                            </Text>

                            <Text className="font-bold">
                                {chegada} min
                            </Text>

                        </View>

                        <View className="mt-4 flex-row justify-between">

                            <Text className="text-slate-500">
                                Tempo de espera
                            </Text>

                            <Text className="font-bold">
                                {espera} min
                            </Text>

                        </View>

                        <View className="mt-6 flex-row justify-between border-t border-slate-200 pt-6">

                            <Text className="text-lg font-bold">
                                Atendimento estimado
                            </Text>

                            <Text className="text-2xl font-bold text-sky-600">
                                {total} min
                            </Text>

                        </View>

                    </View>

                    <View className="mt-8 rounded-2xl bg-sky-50 p-4">

                        <View className="flex-row items-center">

                            <Navigation
                                size={20}
                                color="#0284C7"
                            />

                            <Text className="ml-2 font-semibold text-sky-700">
                                Próximo passo
                            </Text>

                        </View>

                        <Text className="mt-3 text-slate-600">
                            Dirija-se até a unidade e informe que a pré-triagem foi realizada pelo Radar Saúde.
                        </Text>

                    </View>

                </View>

                <TouchableOpacity
                    onPress={() => router.replace("/")}
                    className="mt-10 flex-row items-center justify-center rounded-2xl bg-sky-600 py-4"
                >

                    <House
                        size={22}
                        color="white"
                    />

                    <Text className="ml-3 text-lg font-bold text-white">
                        Voltar ao início
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}

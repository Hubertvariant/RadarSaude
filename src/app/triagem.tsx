import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Slider from "@react-native-community/slider";

import Input from "@/components/Input";
import OpcaoCard from "@/components/OpcaoCard";
import ProgressSteps from "@/components/ProgressSteps";

import { estados, sintomas, tempos } from "@/data/triagem";
import { Triagem } from "@/types/triagem";

import { supabase } from "@/lib/supabase";

export async function enviarTriagem(triagem: any) {
  const { error } = await supabase
    .from("triagens")
    .insert(triagem);

  if (error) throw error;
}

export default function PreTriagem() {
    const { unidadeId, unidadeNome, espera } = useLocalSearchParams();

    const [etapa, setEtapa] = useState(1);

    const [triagem, setTriagem] = useState<Triagem>({
        unidadeId: Number(unidadeId),

        estadoGeral: "",

        sintoma: "",

        tempoSintoma: "",

        intensidade: 5,

        alergias: "",

        observacoes: "",
    });
    function atualizar<K extends keyof Triagem>(campo: K, valor: Triagem[K]) {
        setTriagem((prev) => ({
            ...prev,
            [campo]: valor,
        }));
    }
    async function proximo() {
        if (etapa < 6) {
            setEtapa(etapa + 1);
            return;
        }

        console.log(triagem);
        await enviarTriagem(triagem);
        router.replace({
            pathname: "/triagem-sucesso",
            params: {
                unidadeId: String(unidadeId),
            },
        });
    }

    function voltar() {
        if (etapa === 1) {
            router.back();
            return;
        }

        setEtapa(etapa - 1);
    }
    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            <ScrollView
                contentContainerStyle={{
                    padding: 24,
                    paddingBottom: 60,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}

                <View className="flex-row items-center">
                    <TouchableOpacity onPress={voltar}>
                        <ArrowLeft size={26} />
                    </TouchableOpacity>

                    <Text className="ml-4 text-3xl font-bold">Pré-triagem</Text>
                </View>

                <View className="mt-8">
                    <ProgressSteps etapa={etapa} total={6} />
                </View>

                {/* ETAPA 1 */}

                {etapa === 1 && (
                    <View className="mt-10">
                        <Text className="mb-6 text-2xl font-bold">
                            Como você está se sentindo?
                        </Text>

                        {estados.map((item) => (
                            <OpcaoCard
                                key={item}
                                titulo={item}
                                selecionado={triagem.estadoGeral === item}
                                onPress={() => atualizar("estadoGeral", item)}
                            />
                        ))}
                    </View>
                )}

                {/* ETAPA 2 */}

                {etapa === 2 && (
                    <View className="mt-10">
                        <Text className="mb-6 text-2xl font-bold">
                            Qual o principal sintoma?
                        </Text>

                        {sintomas.map((item) => (
                            <OpcaoCard
                                key={item}
                                titulo={item}
                                selecionado={triagem.sintoma === item}
                                onPress={() => atualizar("sintoma", item)}
                            />
                        ))}
                    </View>
                )}

                {/* ETAPA 3 */}

                {etapa === 3 && (
                    <View className="mt-10">
                        <Text className="text-2xl font-bold">Há quanto tempo?</Text>

                        <View className="mt-6">
                            {tempos.map((item) => (
                                <OpcaoCard
                                    key={item}
                                    titulo={item}
                                    selecionado={triagem.tempoSintoma === item}
                                    onPress={() => atualizar("tempoSintoma", item)}
                                />
                            ))}
                        </View>

                        <Text className="mt-8 text-2xl font-bold">Intensidade</Text>

                        <Slider
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            value={triagem.intensidade}
                            onValueChange={(v) => atualizar("intensidade", v)}
                        />

                        <Text className="mt-2 text-center text-lg font-bold">
                            {triagem.intensidade}/10
                        </Text>
                    </View>
                )}

                {/* ETAPA 4 */}

                {etapa === 4 && (
                    <View className="mt-10">
                        <Text className="mb-6 text-2xl font-bold">
                            Possui alguma alergia?
                        </Text>

                        <Input
                            label="Alergias"
                            value={triagem.alergias}
                            onChangeText={(text) => atualizar("alergias", text)}
                        />
                    </View>
                )}

                {/* ETAPA 5 */}

                {etapa === 5 && (
                    <View className="mt-10">
                        <Text className="mb-6 text-2xl font-bold">Observações</Text>

                        <Input
                            label="Observações"
                            multiline
                            numberOfLines={5}
                            value={triagem.observacoes}
                            onChangeText={(text) => atualizar("observacoes", text)}
                        />
                    </View>
                )}

                {/* ETAPA 6 */}

                {etapa === 6 && (
                    <View className="mt-10 rounded-3xl bg-white p-6">
                        <Text className="mb-6 text-2xl font-bold">Resumo</Text>

                        <Text>Estado: {triagem.estadoGeral}</Text>

                        <Text className="mt-3">Sintoma: {triagem.sintoma}</Text>

                        <Text className="mt-3">Tempo: {triagem.tempoSintoma}</Text>

                        <Text className="mt-3">Intensidade: {triagem.intensidade}/10</Text>

                        <Text className="mt-3">
                            Alergias: {triagem.alergias || "Nenhuma"}
                        </Text>

                        <Text className="mt-3">Observações:</Text>

                        <Text className="text-slate-600">
                            {triagem.observacoes || "Nenhuma"}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={proximo}
                    className="mt-10 rounded-2xl bg-sky-600 py-4"
                >
                    <Text className="text-center text-lg font-bold text-white">
                        {etapa === 6 ? "Enviar pré-triagem" : "Próximo"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

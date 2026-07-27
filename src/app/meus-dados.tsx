import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CadastroForm from "@/components/CadastroForm";
import ProgressSteps from "@/components/ProgressSteps";

import { carregarUsuario, salvarUsuario } from "@/lib/storage";

import { Usuario } from "@/types/usuario";

export default function MeusDados() {
  const { editar } = useLocalSearchParams();

  const modoEdicao = editar === "true";

  const [etapa, setEtapa] = useState(1);

  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    cpf: "",
    cartaoSus: "",
    dataNascimento: "",

    telefone: "",
    contatoEmergencia: "",
    tipoSanguineo: "",
  });

  useEffect(() => {
    async function carregar() {
      if (!modoEdicao) return;

      const dados = await carregarUsuario();

      if (!dados) return;

      setUsuario(dados);

      // edição mostra todos os campos
      setEtapa(2);
    }

    carregar();
  }, []);

  function atualizar<K extends keyof Usuario>(
    campo: K,
    valor: Usuario[K]
  ) {
    setUsuario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  async function salvar() {
    if (
      !usuario.nome ||
      !usuario.cpf ||
      !usuario.cartaoSus ||
      !usuario.dataNascimento
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    await salvarUsuario(usuario);

    if (modoEdicao) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  function proximo() {
    if (etapa === 1 && !modoEdicao) {
      setEtapa(2);
      return;
    }

    salvar();
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            paddingBottom: 80,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}

          <View className="flex-row items-center">

            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft
                size={26}
                color="#0F172A"
              />
            </TouchableOpacity>

            <Text className="ml-4 text-3xl font-bold text-slate-900">
              {modoEdicao ? "Editar Dados" : "Meus Dados"}
            </Text>

          </View>

          <Text className="mt-3 text-slate-500">
            {modoEdicao
              ? "Atualize seus dados sempre que necessário."
              : "Essas informações ficam armazenadas somente neste dispositivo."}
          </Text>

          {!modoEdicao && (
            <ProgressSteps etapa={etapa} />
          )}

          <CadastroForm
            usuario={usuario}
            etapa={etapa}
            modoEdicao={modoEdicao}
            atualizar={atualizar}
          />

          <TouchableOpacity
            className="mt-10 rounded-2xl bg-sky-600 py-4"
            onPress={proximo}
          >
            <Text className="text-center text-lg font-bold text-white">
              {etapa === 1 && !modoEdicao
                ? "Próximo"
                : modoEdicao
                ? "Atualizar"
                : "Salvar"}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

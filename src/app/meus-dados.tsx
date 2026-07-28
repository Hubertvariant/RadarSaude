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

    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  useEffect(() => {
    async function carregar() {
      if (!modoEdicao) return;

      const dados = await carregarUsuario();

      setUsuario(dados);

      setEtapa(3);
    }

    carregar();
  }, [modoEdicao]);

  function atualizar<K extends keyof Usuario>(
    campo: K,
    valor: Usuario[K]
  ) {
    setUsuario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function validarEtapaAtual() {
    if (etapa === 1) {
      if (!usuario.nome) {
        alert("Informe o nome.");
        return false;
      }

      if (!usuario.cpf) {
        alert("Informe o CPF.");
        return false;
      }

      if (!usuario.cartaoSus) {
        alert("Informe o Cartão SUS.");
        return false;
      }

      if (!usuario.dataNascimento) {
        alert("Informe a data de nascimento.");
        return false;
      }
    }

    if (etapa === 2) {
      if (!usuario.telefone) {
        alert("Informe um telefone.");
        return false;
      }
    }

    if (etapa === 3) {
      if (!usuario.cep) {
        alert("Informe o CEP.");
        return false;
      }

      if (!usuario.rua) {
        alert("CEP inválido.");
        return false;
      }

      if (!usuario.numero) {
        alert("Informe o número.");
        return false;
      }
    }

    return true;
  }

  async function salvar() {
    await salvarUsuario(usuario);

    if (modoEdicao) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  function proximo() {
    if (!validarEtapaAtual()) return;

    if (!modoEdicao && etapa < 3) {
      setEtapa(etapa + 1);
      return;
    }

    salvar();
  }

  function voltar() {
    if (modoEdicao) {
      router.back();
      return;
    }

    if (etapa === 1) {
      router.back();
      return;
    }

    setEtapa((prev) => prev - 1);
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 24,
            paddingBottom: 80,
          }}
        >
          {/* HEADER */}

          <View className="flex-row items-center">
            <TouchableOpacity onPress={voltar}>
              <ArrowLeft size={26} color="#0F172A" />
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
            <ProgressSteps etapa={etapa} total={3} />
          )}

          <CadastroForm
            usuario={usuario}
            etapa={etapa}
            modoEdicao={modoEdicao}
            atualizar={atualizar}
          />

          {/* BOTÕES */}

          <View className="mt-10 flex-row gap-4">

            {etapa > 1 && !modoEdicao && (
              <TouchableOpacity
                onPress={voltar}
                className="flex-1 rounded-2xl border border-sky-600 py-4"
              >
                <Text className="text-center text-lg font-bold text-sky-600">
                  Voltar
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={proximo}
              className="flex-1 rounded-2xl bg-sky-600 py-4"
            >
              <Text className="text-center text-lg font-bold text-white">
                {modoEdicao
                  ? "Atualizar"
                  : etapa === 3
                  ? "Salvar"
                  : "Próximo"}
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

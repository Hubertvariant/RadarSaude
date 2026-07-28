import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import Input from "@/components/Input";

import * as masks from "@/lib/masks";
import { buscarCEP } from "@/services/viacep";
import { Usuario } from "@/types/usuario";

interface CadastroFormProps {
  usuario: Usuario;
  etapa: number;
  modoEdicao?: boolean;
  atualizar: <K extends keyof Usuario>(
    campo: K,
    valor: Usuario[K]
  ) => void;
}

export default function CadastroForm({
  usuario,
  etapa,
  modoEdicao = false,
  atualizar,
}: CadastroFormProps) {
  const [buscandoCep, setBuscandoCep] = useState(false);

  async function consultarCEP(valor: string) {
    const cep = masks.cep(valor);

    atualizar("cep", cep);

    if (cep.replace(/\D/g, "").length !== 8) return;

    setBuscandoCep(true);

    const endereco = await buscarCEP(cep);

    setBuscandoCep(false);

    if (!endereco) {
      alert("CEP não encontrado.");
      return;
    }

    atualizar("rua", endereco.logradouro);
    atualizar("bairro", endereco.bairro);
    atualizar("cidade", endereco.localidade);
    atualizar("estado", endereco.uf);
  }

  const mostrarEtapa1 = etapa === 1 || modoEdicao;
  const mostrarEtapa2 = etapa === 2 || modoEdicao;
  const mostrarEtapa3 = etapa === 3 || modoEdicao;

  return (
    <View className="mt-10 gap-5">

      {/* DADOS PESSOAIS */}

      {mostrarEtapa1 && (
        <>
          <Input
            label="Nome completo"
            value={usuario.nome}
            onChangeText={(text) => atualizar("nome", text)}
          />

          <Input
            label="CPF"
            keyboardType="numeric"
            value={usuario.cpf}
            onChangeText={(text) =>
              atualizar("cpf", masks.cpf(text))
            }
          />

          <Input
            label="Cartão SUS"
            keyboardType="numeric"
            value={usuario.cartaoSus}
            onChangeText={(text) =>
              atualizar("cartaoSus", masks.sus(text))
            }
          />

          <Input
            label="Data de nascimento"
            keyboardType="numeric"
            value={usuario.dataNascimento}
            onChangeText={(text) =>
              atualizar("dataNascimento", masks.data(text))
            }
          />
        </>
      )}

      {/* CONTATO */}

      {mostrarEtapa2 && (
        <>
          <Input
            label="Telefone"
            keyboardType="phone-pad"
            value={usuario.telefone}
            onChangeText={(text) =>
              atualizar("telefone", masks.telefone(text))
            }
          />

          <Input
            label="Contato de emergência"
            keyboardType="phone-pad"
            value={usuario.contatoEmergencia}
            onChangeText={(text) =>
              atualizar(
                "contatoEmergencia",
                masks.telefone(text)
              )
            }
          />

          <Input
            label="Tipo sanguíneo (Opcional)"
            autoCapitalize="characters"
            value={usuario.tipoSanguineo}
            onChangeText={(text) =>
              atualizar("tipoSanguineo", text.toUpperCase())
            }
          />
        </>
      )}

      {/* ENDEREÇO */}

      {mostrarEtapa3 && (
        <>
          <Input
            label="CEP"
            keyboardType="numeric"
            value={usuario.cep}
            onChangeText={consultarCEP}
          />

          {buscandoCep && (
            <View className="flex-row items-center">
              <ActivityIndicator />
              <Text className="ml-3 text-slate-500">
                Buscando endereço...
              </Text>
            </View>
          )}

          <Input
            label="Rua"
            editable={false}
            value={usuario.rua}
            onChangeText={() => {}}
          />

          <Input
            label="Número"
            keyboardType="numeric"
            value={usuario.numero}
            onChangeText={(text) =>
              atualizar("numero", text)
            }
          />

          <Input
            label="Complemento"
            value={usuario.complemento}
            onChangeText={(text) =>
              atualizar("complemento", text)
            }
          />

          <Input
            label="Bairro"
            editable={false}
            value={usuario.bairro}
            onChangeText={() => {}}
          />

          <Input
            label="Cidade"
            editable={false}
            value={usuario.cidade}
            onChangeText={() => {}}
          />

          <Input
            label="Estado"
            editable={false}
            value={usuario.estado}
            onChangeText={() => {}}
          />
        </>
      )}

    </View>
  );
}

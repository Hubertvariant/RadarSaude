import Input from "@/components/Input";
import * as masks from "@/lib/masks";
import { Usuario } from "@/types/usuario";
import { View } from "react-native";

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
  return (
    <View className="mt-10 gap-5">

      {(etapa === 1 && !modoEdicao) && (
        <>
          <Input
            label="Nome completo"
            value={usuario.nome}
            onChangeText={(text) =>
              atualizar("nome", text)
            }
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

      {(etapa === 2 || modoEdicao) && (
        <>
          {modoEdicao && (
            <>
              <Input
                label="Nome completo"
                value={usuario.nome}
                onChangeText={(text) =>
                  atualizar("nome", text)
                }
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
            value={usuario.tipoSanguineo}
            onChangeText={(text) =>
              atualizar(
                "tipoSanguineo",
                text.toUpperCase()
              )
            }
          />
        </>
      )}

    </View>
  );
}

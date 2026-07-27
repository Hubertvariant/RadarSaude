import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TriangleAlert, Phone, MapPin } from "lucide-react-native";

export default function Sos() {
  function ligarSAMU() {
    Alert.alert(
      "Ligar para o SAMU",
      "Deseja ligar para o número 192?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Ligar",
          onPress: () => Linking.openURL("tel:192"),
        },
      ]
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-red-50">
      <View className="flex-1 px-6 py-8">

        {/* Ícone */}

        <View className="items-center">

          <View className="h-28 w-28 items-center justify-center rounded-full bg-red-100">

            <TriangleAlert
              size={72}
              color="#DC2626"
            />

          </View>

        </View>

        {/* Título */}

        <Text className="mt-8 text-center text-3xl font-bold text-red-700">
          Emergência
        </Text>

        <Text className="mt-4 text-center text-lg text-slate-600">
          Utilize esta opção somente em situações com risco imediato à vida.
        </Text>

        {/* Informações */}

        <View className="mt-10 rounded-3xl bg-white p-6">

          <View className="flex-row items-center">

            <Phone
              size={22}
              color="#DC2626"
            />

            <Text className="ml-3 text-lg font-semibold text-slate-900">
              SAMU - 192
            </Text>

          </View>

          <Text className="mt-3 text-slate-600">
            Ao confirmar, seu telefone iniciará uma ligação para o Serviço de Atendimento Móvel de Urgência.
          </Text>

          <View className="mt-8 flex-row items-center">

            <MapPin
              size={22}
              color="#0284C7"
            />

            <Text className="ml-3 flex-1 text-slate-600">
              Em versões futuras, sua localização poderá ser compartilhada para agilizar o atendimento.
            </Text>

          </View>

        </View>

        {/* Botão */}

        <TouchableOpacity
          onPress={ligarSAMU}
          className="mt-10 rounded-2xl bg-red-600 py-5"
        >

          <Text className="text-center text-xl font-bold text-white">
            Ligar para o SAMU (192)
          </Text>

        </TouchableOpacity>

        {/* Aviso */}

        <Text className="mt-8 text-center text-slate-500">
          Para casos sem risco imediato, utilize a pré-triagem e escolha a unidade de saúde mais adequada.
        </Text>

      </View>
    </SafeAreaView>
  );
}

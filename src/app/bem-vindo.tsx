import { router } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";

export default function BemVindo() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={["#0F4C81", "#1E88E5"]}
        style={{
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
      }}
      >
        <View className="items-center">

          <View className="mb-8 h-28 w-28 items-center justify-center rounded-full bg-white/20">
            <ShieldCheck size={60} color="white" />
          </View>

          <Text className="text-center text-4xl font-bold text-white">
            Radar Saúde
          </Text>

          <Text className="mt-3 text-center text-xl font-semibold text-white">
            Bem-vindo!
          </Text>

          <Text className="mt-8 text-center text-base leading-7 text-blue-100">
            Para agilizar seu atendimento nas unidades de saúde,
            precisamos de algumas informações básicas.
          </Text>

          <View className="mt-8 rounded-2xl bg-white/15 p-5">
            <Text className="text-center text-sm leading-6 text-white">
              🔒 Seus dados ficam armazenados apenas neste dispositivo e
              só serão enviados quando você autorizar uma pré-triagem ou
              solicitação de atendimento.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/meus-dados")}
            className="mt-12 w-full rounded-2xl bg-white py-4"
          >
            <Text className="text-center text-lg font-bold text-sky-700">
              Continuar
            </Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

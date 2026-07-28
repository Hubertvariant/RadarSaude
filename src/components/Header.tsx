import { Menu } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  onOpenMenu: () => void;
}

export default function Header({ onOpenMenu }: HeaderProps) {
  return (
    <LinearGradient
      colors={["#059669", "#4f46e5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-b-[32px] px-6 pt-5 pb-6"
    >
      <View className="mx-2 my-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-white">Radar Saúde</Text>
            <Text className="mt-1 text-blue-100">
              Encontre a melhor unidade para você
            </Text>
          </View>

          {/* Botão para abrir o menu lateral */}
          <TouchableOpacity
            onPress={onOpenMenu}
            className="h-11 w-11 items-center justify-center rounded-full bg-white/20"
            activeOpacity={0.7}
          >
            <Menu color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

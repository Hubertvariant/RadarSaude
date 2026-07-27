import { Bell, Search, UserCircle2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <LinearGradient
            colors={["#059669", "#4f46e5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-b-[32px] px-6 pt-5 pb-6"
        >
            <View className="mx-6 my-12">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-3xl font-bold text-white">Radar Saúde</Text>

                        <Text className="mt-1 text-blue-100">
                            Encontre a melhor unidade para você
                        </Text>
                    </View>

                    <View className="flex-row gap-3">
                        <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-full bg-white/20">
                            <Bell color="white" size={22} />
                        </TouchableOpacity>

                        <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-full bg-white/20">
                            <UserCircle2 color="white" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

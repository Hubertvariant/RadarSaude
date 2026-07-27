import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View className="m-5 rounded-2xl bg-white px-4 py-3 shadow-lg">
      <View className="flex-row items-center">
        <Search size={20} color="#64748B" />

        <TextInput
          placeholder="Buscar unidade de saúde..."
          placeholderTextColor="#94A3B8"
          className="ml-3 flex-1 text-base text-slate-800"
        />
      </View>
    </View>
  );
}

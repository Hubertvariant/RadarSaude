import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <View className="m-5 rounded-2xl bg-white px-4 py-3 shadow-lg">
      <View className="flex-row items-center">

        <Search
          size={20}
          color="#64748B"
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Buscar unidade, bairro ou tipo..."
          placeholderTextColor="#94A3B8"
          className="ml-3 flex-1 text-base text-slate-800"
          autoCapitalize="words"
          returnKeyType="search"
        />

      </View>
    </View>
  );
}

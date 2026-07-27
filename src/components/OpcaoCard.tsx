import { Text, TouchableOpacity } from "react-native";

interface Props {
  titulo: string;
  selecionado: boolean;
  onPress: () => void;
}

export default function OpcaoCard({
  titulo,
  selecionado,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`mb-4 rounded-2xl border p-5 ${
        selecionado
          ? "border-sky-600 bg-sky-100"
          : "border-slate-300 bg-white"
      }`}
    >
      <Text
        className={`text-lg font-semibold ${
          selecionado
            ? "text-sky-700"
            : "text-slate-800"
        }`}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

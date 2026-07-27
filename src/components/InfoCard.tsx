import { Text, View } from "react-native";

interface InfoCardProps {
  titulo: string;
  valor?: string;
}

export default function InfoCard({
  titulo,
  valor,
}: InfoCardProps) {
  return (
    <View className="rounded-2xl border border-slate-200 bg-white p-4">
      <Text className="text-sm text-slate-500">
        {titulo}
      </Text>

      <Text className="mt-1 text-base font-semibold text-slate-900">
        {valor || "-"}
      </Text>
    </View>
  );
}

import { Text, View } from "react-native";

export default function MapLegend() {
  return (
    <View className="mx-5 mt-5 flex-row justify-between rounded-2xl bg-white p-4 shadow">
      <View className="flex-row items-center">
        <View className="mr-2 h-3 w-3 rounded-full bg-green-500" />
        <Text className="text-xs text-slate-600">Até 20 min</Text>
      </View>

      <View className="flex-row items-center">
        <View className="mr-2 h-3 w-3 rounded-full bg-yellow-400" />
        <Text className="text-xs text-slate-600">20–50 min</Text>
      </View>

      <View className="flex-row items-center">
        <View className="mr-2 h-3 w-3 rounded-full bg-red-500" />
        <Text className="text-xs text-slate-600">+50 min</Text>
      </View>
    </View>
  );
}

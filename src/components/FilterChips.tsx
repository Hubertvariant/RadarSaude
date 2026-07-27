import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const filtros = ["Todos", "UBS", "UPA", "Hospital"];

export default function FilterChips() {
  const [ativo, setAtivo] = useState("Todos");

  return (
    <View className="mx-5 mt-4 flex-row justify-between">
      {filtros.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => setAtivo(item)}
          className={`rounded-full px-4 py-2 ${
            ativo === item ? "bg-sky-600" : "bg-slate-200"
          }`}
        >
          <Text
            className={`font-medium ${
              ativo === item ? "text-white" : "text-slate-700"
            }`}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

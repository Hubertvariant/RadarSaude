import { Car, List } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export default function FloatingButtons() {
  return (
    <View className="absolute right-5 bottom-28 gap-3">

      <TouchableOpacity
        className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg"
      >
        <Car size={24} color="#0284C7" />
      </TouchableOpacity>

      <TouchableOpacity
        className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg"
      >
        <List size={24} color="#0284C7" />
      </TouchableOpacity>

    </View>
  );
}

import "../../global.css";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function RootLayout() {
  const { isMobile } = useIsMobile();

  return (
    <View className="flex-1 bg-slate-100 min-h-screen">
      <View 
        className={
          isMobile 
            ? "w-full flex-1" 
            : "w-full max-w-6xl mx-auto flex-1 shadow-lg my-4 rounded-2xl overflow-hidden"
        }
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: isMobile ? "default" : "fade", // Slide no celular, Fade no PC!
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen name="bem-vindo" />
          <Stack.Screen name="meus-dados" />
        </Stack>
      </View>
    </View>
  );
}

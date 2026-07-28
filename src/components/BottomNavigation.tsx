import { router, usePathname } from "expo-router";
import {
  ClipboardList,
  TriangleAlert,
  UserRound,
} from "lucide-react-native";
import { TouchableOpacity, View, Text } from "react-native";

const tabs = [
  {
    label: "Unidades",
    icon: ClipboardList,
    route: "/atendimento",
  },
  {
    label: "SOS",
    icon: TriangleAlert,
    route: "/sos",
  },
  {
    label: "Perfil",
    icon: UserRound,
    route: "/perfil",
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <View className="w-20 h-full bg-white py-6 items-center border-r border-slate-100 shadow-md">
      {/* Container das opções com espaçamento entre elas */}
      <View className="gap-y-6 w-full items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.route;

          return (
            <TouchableOpacity
              key={tab.label}
              className={`items-center justify-center p-2 rounded-xl w-16 ${
                active ? "bg-sky-50" : ""
              }`}
              onPress={() => router.push(tab.route as any)}
            >
              <Icon
                size={24}
                color={active ? "#0284C7" : "#94A3B8"}
              />

              <Text
                className={`mt-1 text-[10px] text-center ${
                  active
                    ? "font-semibold text-sky-600"
                    : "text-slate-400"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

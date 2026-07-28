import { router, usePathname } from "expo-router";
import {
  ClipboardList,
  TriangleAlert,
  UserRound,
  X,
} from "lucide-react-native";
import { TouchableOpacity, View, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  function handleNavigate(route: string) {
    onClose();
    router.push(route as any);
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row bg-black/50">
        {/* Painel da Gaveta Lateral */}
        <SafeAreaView className="w-3/4 max-w-[300px] h-full bg-white p-5 shadow-2xl">
          {/* Cabeçalho do Menu com Botão de Fechar */}
          <View className="flex-row items-center justify-between pb-6 border-b border-slate-100">
            <Text className="text-xl font-bold text-slate-800">Menu</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Links de Navegação */}
          <View className="mt-6 gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = pathname === tab.route;

              return (
                <TouchableOpacity
                  key={tab.label}
                  className={`flex-row items-center gap-4 p-3 rounded-xl ${
                    active ? "bg-sky-50" : "bg-transparent"
                  }`}
                  onPress={() => handleNavigate(tab.route)}
                >
                  <Icon
                    size={22}
                    color={active ? "#0284C7" : "#64748B"}
                  />

                  <Text
                    className={`text-base ${
                      active
                        ? "font-bold text-sky-600"
                        : "font-medium text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </SafeAreaView>

        {/* Área fora do menu: ao clicar, fecha a gaveta */}
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
}

import { router, usePathname } from "expo-router";

import {

  House,

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



export default function BottomNavigation() {

  const pathname = usePathname();



  return (

    <View className=" flex-row justify-around mt-2 bg-white py-4 shadow-xl">

      {tabs.map((tab) => {

        const Icon = tab.icon;

        const active = pathname === tab.route;



        return (

          <TouchableOpacity

            key={tab.label}

            className="items-center"

            onPress={() => router.push(tab.route as any)}

          >

            <Icon

              size={24}

              color={active ? "#0284C7" : "#94A3B8"}

            />



            <Text

              className={`mt-1 text-xs ${

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

  );

}

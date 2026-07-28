import { Text, TouchableOpacity, View } from "react-native";

const filtros = [
    "Todos",
    "UBS",
    "PA18",
    "UPA",
    "Hospital",
];

interface Props {
    ativo: string;
    onChange: (filtro: string) => void;
}

export default function FilterChips({
    ativo,
    onChange,
}: Props) {
    return (
        <View className="mx-5 mt-4 flex-row flex-wrap gap-2">

            {filtros.map((item) => (

                <TouchableOpacity
                    key={item}
                    onPress={() => onChange(item)}
                    className={`rounded-full px-4 py-2 ${
                        ativo === item
                            ? "bg-sky-600"
                            : "bg-slate-200"
                    }`}
                >
                    <Text
                        className={`font-medium ${
                            ativo === item
                                ? "text-white"
                                : "text-slate-700"
                        }`}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>

            ))}

        </View>
    );
}

import { Text, View } from "react-native";

interface ProgressStepsProps {
  etapa: number;
  total?: number;
}

export default function ProgressSteps({
  etapa,
  total = 2,
}: ProgressStepsProps) {
  return (
    <View className="mt-10">

      <View className="flex-row items-center">

        {[...Array(total)].map((_, index) => {
          const numero = index + 1;

          return (
            <View
              key={numero}
              className="flex-row items-center flex-1"
            >
              <View
                className={`h-9 w-9 rounded-full items-center justify-center ${
                  etapa >= numero
                    ? "bg-sky-600"
                    : "bg-slate-300"
                }`}
              >
                <Text className="font-bold text-white">
                  {numero}
                </Text>
              </View>

              {numero < total && (
                <View
                  className={`h-1 flex-1 ${
                    etapa > numero
                      ? "bg-sky-600"
                      : "bg-slate-300"
                  }`}
                />
              )}
            </View>
          );
        })}

      </View>

      <Text className="mt-4 text-center text-slate-500">
        Etapa {etapa} de {total}
      </Text>

    </View>
  );
}

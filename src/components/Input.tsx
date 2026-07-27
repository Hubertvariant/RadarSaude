import { Text, TextInput, TextInputProps, View } from "react-native";

interface Props {
  label: string;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  value: string;
  onChangeText: (text: string) => void;

  multiline?: boolean;
  numberOfLines?: number;
}

export default function Input({
  label,
  placeholder,
  keyboardType,
  value,
  onChangeText,

  multiline = false,
  numberOfLines = 1,
}: Props) {
  return (
    <View>
      <Text className="mb-2 text-sm font-semibold text-slate-700">
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? "top" : "center"}
        className={`rounded-2xl border border-slate-300 bg-white px-5 text-base ${
          multiline ? "py-4 min-h-32" : "py-4"
        }`}
      />
    </View>
  );
}

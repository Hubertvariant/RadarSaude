import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export default function Screen({
  children,
}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {children}
    </SafeAreaView>
  );
}

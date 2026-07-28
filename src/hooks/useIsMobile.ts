import { useWindowDimensions } from "react-native";

export function useIsMobile() {
  const { width } = useWindowDimensions();

  // 768px é o padrão do Tailwind para tablets e telas maiores (md:)
  const isMobile = width < 768;

  return {
    isMobile,
    isDesktop: !isMobile,
    width,
  };
}

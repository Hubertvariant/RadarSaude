import { COLORS } from "@/constants/colors";

export const STATUS = {
  verde: {
    cor: COLORS.success,
    texto: "Pouco movimento",
  },

  amarelo: {
    cor: COLORS.warning,
    texto: "Movimento moderado",
  },

  vermelho: {
    cor: COLORS.danger,
    texto: "Muito movimento",
  },
} as const;

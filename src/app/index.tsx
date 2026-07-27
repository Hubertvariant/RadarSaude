import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

import { carregarUsuario } from "@/lib/storage";
import { usuarioCompleto } from "@/lib/validation";

export default function Index() {
  const [rota, setRota] = useState<string | null>(null);

  useEffect(() => {
    async function verificar() {
      const usuario = await carregarUsuario();

      if (!usuario) {
        setRota("/bem-vindo");
        return;
      }

      if (!usuarioCompleto(usuario)) {
        setRota("/meus-dados");
        return;
      }

      setRota("/home");
    }

    verificar();
  }, []);

  if (!rota) return null;

  return <Redirect href={rota} />;
}

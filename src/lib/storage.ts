import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "@/constants/storageKeys";
import { Usuario } from "@/types/usuario";

export async function salvarUsuario(usuario: Usuario) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USUARIO,
      JSON.stringify(usuario)
    );
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
}

export async function carregarUsuario(): Promise<Usuario | null> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEYS.USUARIO);

    if (!json) return null;

    return JSON.parse(json);
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    return null;
  }
}

export async function removerUsuario() {
  await AsyncStorage.removeItem(STORAGE_KEYS.USUARIO);
}

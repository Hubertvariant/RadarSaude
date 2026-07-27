import { Usuario } from "@/types/usuario";

export function usuarioCompleto(usuario: Usuario | null) {
  if (!usuario) return false;

  return (
    usuario.nome.trim() !== "" &&
    usuario.cpf.trim() !== "" &&
    usuario.cartaoSus.trim() !== "" &&
    usuario.dataNascimento.trim() !== ""
  );
}

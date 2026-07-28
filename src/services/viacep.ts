export interface EnderecoViaCEP {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function buscarCEP(
  cep: string
): Promise<EnderecoViaCEP | null> {

  const somenteNumeros = cep.replace(/\D/g, "");

  if (somenteNumeros.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${somenteNumeros}/json/`
    );

    const endereco = await response.json();

    if (endereco.erro) {
      return null;
    }

    return endereco;
  } catch {
    return null;
  }
}

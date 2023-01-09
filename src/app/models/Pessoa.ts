import { Endereco } from "./Endereco";

export interface Pessoa {
  id: number,
  nome: string,
  dataNascimento: string,
  enderecos: Endereco[]
}

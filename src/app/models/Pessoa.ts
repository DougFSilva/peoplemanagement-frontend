import { Endereco } from "./Endereco";

export interface Pessoa {
  id: number,
  nome: string,
  dataNascimento: Date,
  enderecos: Endereco[]
}

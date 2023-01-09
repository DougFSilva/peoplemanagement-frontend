import { DadosCriarEndereco } from './../models/DadosCriarEndereco';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DadosCriarOuEditarPessoa } from '../models/DadosCriarPessoa';
import { Pessoa } from '../models/Pessoa';
import { Endereco } from '../models/Endereco';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  public criarPessoa(dados: DadosCriarOuEditarPessoa):Observable<Pessoa>{
    return this.http.post<Pessoa>(`${environment.baseUrl}/pessoa`, dados);
  }

  public deletarPessoa(id: number):Observable<Pessoa> {
   return this.http.delete<Pessoa>(`${environment.baseUrl}/pessoa/${id}`);
  }

  public editarPessoa(id: number, dados: DadosCriarOuEditarPessoa):Observable<Pessoa> {
    return this.http.put<Pessoa>(`${environment.baseUrl}/pessoa/${id}`, dados);
  }

  public adicionarEndereco(id: number, endereco: DadosCriarEndereco):Observable<Pessoa>{
    return this.http.post<Pessoa>(`${environment.baseUrl}/pessoa/${id}/adicionar-endereco`, endereco);
  }

  public removerEndereco(id: number, enderecoId: number):Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${environment.baseUrl}/pessoa/${id}/remover-endereco/${enderecoId}`);
  }

  public editarEndereco(id: number, enderecoEditado: Endereco):Observable<Pessoa> {
    return this.http.put<Pessoa>(`${environment.baseUrl}/pessoa/${id}/editar-endereco`, enderecoEditado);
  }

  public buscarPessoaPeloId(id: number):Observable<Pessoa> {
    return this.http.get<Pessoa>(`${environment.baseUrl}/pessoa/${id}`);
  }

  public buscarPessoasPeloNome(nome: string, pagina: number, pessoasPorPagina: number):Observable<any> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa/nome/${nome}?page=${pagina}&size=${pessoasPorPagina}`);
  }

  public buscarPessoasPelaCidade(cidade: string, pagina: number, pessoasPorPagina: number):Observable<any> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa/cidade/${cidade}?page=${pagina}&size=${pessoasPorPagina}`);
  }

  public buscarPessoasPeloCep(cep: string, pagina: number, pessoasPorPagina: number):Observable<any> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa/cep/${cep}?page=${pagina}&size=${pessoasPorPagina}`);
  }

  public buscarTodasPessoas(pagina: number, pessoasPorPagina: number):Observable<any> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa?page=${pagina}&size=${pessoasPorPagina}`);
  }

}

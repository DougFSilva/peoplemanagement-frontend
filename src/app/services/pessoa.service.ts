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

  public deletarPessoa(id: number):void {
    this.http.delete(`${environment.baseUrl}/pessoa/${id}`);
  }

  public editarPessoa(id: number, dados: DadosCriarOuEditarPessoa):Observable<Pessoa> {
    return this.http.put<Pessoa>(`${environment.baseUrl}/pessoa/${id}`, dados);
  }

  public adicionarEndereco(id: number, endereco: Endereco):Observable<Pessoa>{
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

  public buscarPessoasPeloNome(nome: string):Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa/nome/${nome}`);
  }

  public buscarPessoasPelaCidade(cidade: string):Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa/cidade/${cidade}`);
  }

  public buscarPessoasPeloCep(cep: string):Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa/cep/${cep}`);
  }

  public buscarTodasPessoas():Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${environment.baseUrl}/pessoa`);
  }

}

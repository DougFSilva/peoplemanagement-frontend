
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Pessoa } from 'src/app/models/Pessoa';
import { Paginacao } from 'src/app/models/Paginacao';
import { PessoaService } from 'src/app/services/pessoa.service';
import { CriarPessoaComponent } from './criar-pessoa/criar-pessoa.component';
import { DetalhesPessoaComponent } from './detalhes-pessoa/detalhes-pessoa.component';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { ConfirmacaoDialogComponent } from './../confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css'],
})
export class PessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];
  paginacao: Paginacao;
  displayedColumns: string[] = [
    'id',
    'nome',
    'dataNascimento',
    'endereco',
    'detalhes',
    'comandos',
  ];
  dataSource = new MatTableDataSource(this.pessoas);
  inputBuscar = '';
  parametroDeBusca: string = 'todos';
  constructor(
    private service: PessoaService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setarPaginacaoDefault();
    this.buscarPessoas();
  }

  public buscarPessoas() {
    switch (this.parametroDeBusca) {
      case 'todos':
        this.buscarTodasPessoas();
        break;
      case 'nome':
        this.buscarPessoaPorNome();
        break;
      case 'cidade':
        this.buscarPessoaPelaCidade();
        break;
      case 'cep':
        this.buscarPessoaPeloCep();
        break;
    }
  }

  public buscarTodasPessoas() {
    this.service
      .buscarTodasPessoas(this.paginacao.numeroDaPagina, this.paginacao.elementosPorPagina)
      .subscribe(
        (response) => {
          this.pessoas = response.content;
          this.dataSource = new MatTableDataSource(this.pessoas);
          this.capturarDadosDePaginacao(response);
        },
        (ex) => {
          this.toastr.error(ex.error.erro, 'ERRO');
        }
      );
  }

  public buscarPessoaPorNome(): void {
    this.service
      .buscarPessoasPeloNome(this.inputBuscar, this.paginacao.numeroDaPagina,this.paginacao.elementosPorPagina)
      .subscribe(
        (response) => {
          this.pessoas = response.content;
          this.dataSource = new MatTableDataSource(this.pessoas);
          if(response.length == 0){
            this.setarPaginacaoDefault();
            return;
          }
          this.capturarDadosDePaginacao(response);
        },
        (ex) => {
          console.log(ex);
          this.toastr.error(ex.error.erro, 'ERRO');
        }
      );
  }

  public buscarPessoaPelaCidade(): void {
    this.service
      .buscarPessoasPelaCidade(this.inputBuscar, this.paginacao.numeroDaPagina, this.paginacao.elementosPorPagina)
      .subscribe(
        (response) => {
          this.pessoas = response.content;
          this.dataSource = new MatTableDataSource(this.pessoas);
          if(response.length == 0){
            this.setarPaginacaoDefault();
            return;
          }
          this.capturarDadosDePaginacao(response);
        },
        (ex) => {
          this.toastr.error(ex.error.erro, 'ERRO');
        }
      );
  }

  public buscarPessoaPeloCep(): void {
    this.service
      .buscarPessoasPeloCep(this.inputBuscar, this.paginacao.numeroDaPagina, this.paginacao.elementosPorPagina)
      .subscribe(
        (response) => {
          this.pessoas = response.content;
          this.dataSource = new MatTableDataSource(this.pessoas);
          if(response.length == 0){
            this.setarPaginacaoDefault();
            return;
          }
          this.capturarDadosDePaginacao(response);
        },
        (ex) => {
          this.toastr.error(ex.error.erro, 'ERRO');
        }
      );
  }

  public criarPessoa(): void {
    let dialog = this.dialog.open(CriarPessoaComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.buscarPessoas();
      }
    });
  }

  public deletarPessoa(pessoa: Pessoa): void {
    let dialog = this.dialog.open(ConfirmacaoDialogComponent, {
      data: {
        mensagem: 'Deseja realmente excluir essa pessoa ' + pessoa.nome + '?',
      },
    });
    dialog.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.service.deletarPessoa(pessoa.id).subscribe(
          () => {
            this.toastr.success('Pessoa ' + pessoa.nome + ' deletada com seucesso!', 'SUCESSO');
            this.buscarPessoas();
          },
          (ex) => {
            this.toastr.error(ex.error.erro, 'ERRO');
          }
        );
      }
    });
  }

  public editarPessoa(id: number): void {
    let dialog = this.dialog.open(EditarPessoaComponent, { data: { id: id } });
    dialog.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.buscarPessoas();
      }
    });
  }

  public verDetalhesDaPessoa(id: number): void {
    let dialog = this.dialog.open(DetalhesPessoaComponent, { data: { id: id } });
    dialog.afterClosed().subscribe(() => {
      this.buscarPessoas();
    })
  }

  public avancarPagina(): void {
    this.paginacao.numeroDaPagina = this.paginacao.numeroDaPagina + 1;
    this.buscarPessoas();
  }

  public voltarPagina(): void {
    this.paginacao.numeroDaPagina -= 1;
    this.buscarPessoas();
  }

  private capturarDadosDePaginacao(dados: any): void {
    this.paginacao.primeira = dados.first;
    this.paginacao.ultima = dados.last;
    this.paginacao.numeroDaPagina = dados.number;
    this.paginacao.numeroDeElementos = dados.numberOfElements;
    this.paginacao.elementosPorPagina = dados.size;
    this.paginacao.totalDeElementos = dados.totalElements;
    this.paginacao.totalDePaginas = dados.totalPages;
  }

  private setarPaginacaoDefault(): void {
    this.paginacao = new Paginacao(1, 0, 0, 0, true, true, 5);
  }
}

import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { PessoaService } from 'src/app/services/pessoa.service';
import { Pessoa } from 'src/app/models/Pessoa';
import { AdicionarEnderecoComponent } from '../adicionar-endereco/adicionar-endereco.component';
import { Endereco } from 'src/app/models/Endereco';
import { ConfirmacaoDialogComponent } from '../../confirmacao-dialog/confirmacao-dialog.component';
import { EditarEnderecoComponent } from '../editar-endereco/editar-endereco.component';


@Component({
  selector: 'app-detalhes-pessoa',
  templateUrl: './detalhes-pessoa.component.html',
  styleUrls: ['./detalhes-pessoa.component.css'],
})
export class DetalhesPessoaComponent implements OnInit {
  pessoa: Pessoa = {
    id: 0,
    nome: '',
    dataNascimento: '',
    enderecos: [],
  };
  displayedColumns: string[] = [
    'id',
    'logradouro',
    'cep',
    'numero',
    'cidade',
    'principal',
    'comandos',
  ];
  dataSource = new MatTableDataSource(this.pessoa.enderecos);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private service: PessoaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buscarPessoa();
    this.dataSource = new MatTableDataSource(this.pessoa.enderecos);
  }

  public buscarPessoa(): void {
    this.service.buscarPessoaPeloId(this.data.id).subscribe(
      (response) => {
        this.pessoa = response;
        this.dataSource = new MatTableDataSource(this.pessoa.enderecos);
      },
      (ex) => {
        this.toastr.error(ex.error.erro, 'ERRO');
      }
    );
  }

  public adicionarEndereco(): void {
    let dialog = this.dialog.open(AdicionarEnderecoComponent, {
      data: { pessoa: this.pessoa },
    });
    dialog.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.buscarPessoa();
      }
    });
  }

  public removerEndereco(endereco: Endereco): void {
    let dialog = this.dialog.open(ConfirmacaoDialogComponent, {
      data: {
        mensagem:
          'Deseja realmente remover o endereço ' + endereco.logradouro + ' ' +
          endereco.numero + ', ' + endereco.cidade + ' - CEP: ' +endereco.cep,
      },
    });
    dialog.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.service.removerEndereco(this.pessoa.id, endereco.id).subscribe(
          () => {
            this.toastr.success('Endereço adicionado com sucesso', 'SUCESSO');
            this.buscarPessoa();
          },
          (ex) => {
            this.toastr.error(ex.error.erro, 'ERRO');
          }
        );
      }
    });
  }

  public editarEndereco(endereco: Endereco): void {
    let dialog = this.dialog.open(EditarEnderecoComponent, {
      data: { pessoaId: this.pessoa.id, endereco: endereco },
    });
    dialog.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.buscarPessoa();
      }
    });
  }
}

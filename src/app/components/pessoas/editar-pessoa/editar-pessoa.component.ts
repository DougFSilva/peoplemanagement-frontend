
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DadosCriarOuEditarPessoa } from 'src/app/models/DadosCriarPessoa';

import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.css']
})
export class EditarPessoaComponent implements OnInit {

  dados: DadosCriarOuEditarPessoa = {
    nome: '',
    dataNascimento: '',
  };
  constructor(
    private service: PessoaService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.buscarPessoa();
  }

  public buscarPessoa(): void{
    this.service.buscarPessoaPeloId(this.data.id).subscribe(response => {
      this.dados = response
    }, (ex) => {
      this.toastr.error(ex.error.erro), "ERRO"
    })
  }

  public editarPessoa(): void {
    this.service.editarPessoa(this.data.id, this.dados).subscribe(() => {
      this.toastr.success("Pessoa editada com sucesso!", "ERRO")
    }, (ex) => {
      this.toastr.error(ex.error.erro, "ERRO")
    })
  }

}

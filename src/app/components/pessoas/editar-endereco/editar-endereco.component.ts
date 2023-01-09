import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Endereco } from 'src/app/models/Endereco';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-editar-endereco',
  templateUrl: './editar-endereco.component.html',
  styleUrls: ['./editar-endereco.component.css']
})
export class EditarEnderecoComponent implements OnInit{

  pessoaId: number = 0;

  endereco: Endereco = {
    id: 0,
    logradouro: '',
    cep: '',
    numero: '',
    cidade: '',
    principal: false
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PessoaService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.pessoaId = this.data.pessoaId;
    this.endereco = this.data.endereco;
  }

  public editarEndereco():void {
    this.service.editarEndereco(this.pessoaId, this.endereco).subscribe(() => {
      this.toastr.success("Endereço editado com sucesso!", "SUCESSO");
    }, (ex) => {
      this.toastr.error(ex.error.erro, "ERRO");
    })
  }
}

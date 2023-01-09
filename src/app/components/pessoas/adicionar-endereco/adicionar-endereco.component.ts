import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { DadosCriarEndereco } from 'src/app/models/DadosCriarEndereco';
import { Pessoa } from 'src/app/models/Pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-adicionar-endereco',
  templateUrl: './adicionar-endereco.component.html',
  styleUrls: ['./adicionar-endereco.component.css']
})
export class AdicionarEnderecoComponent implements OnInit{
  pessoa:Pessoa = {
    id: 0,
    nome: '',
    dataNascimento: '',
    enderecos: []
  }
  endereco: DadosCriarEndereco = {
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
   ){}

  ngOnInit(): void {
    this.pessoa = this.data.pessoa;
  }

   public criarEndereco(): void {
    this.service.adicionarEndereco(this.pessoa.id, this.endereco).subscribe(() => {
    this.toastr.success("Endereço adicionado com sucesso!", "SUCESSO");
    },(ex) => {
      this.toastr.error(ex.error.erro, "ERRO");
    })
   }

}

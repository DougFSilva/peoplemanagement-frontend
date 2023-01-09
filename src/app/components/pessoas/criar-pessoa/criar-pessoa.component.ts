import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/services/pessoa.service';

import { DadosCriarOuEditarPessoa } from 'src/app/models/DadosCriarPessoa';

@Component({
  selector: 'app-criar-pessoa',
  templateUrl: './criar-pessoa.component.html',
  styleUrls: ['./criar-pessoa.component.css'],
})
export class CriarPessoaComponent implements OnInit {
  dados: DadosCriarOuEditarPessoa = {
    nome: '',
    dataNascimento: null,
  };

  constructor(private service: PessoaService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  public criarPessoa(): void {
    this.service.criarPessoa(this.dados).subscribe(
      () => {
        this.toastr.success('Pessoa criada com sucesso!', 'SUCESSO');
      },
      (ex) => {
        this.toastr.error(ex.error.erro, 'ERRO');
      }
    );
  }
}

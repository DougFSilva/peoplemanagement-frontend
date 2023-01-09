import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { PessoasComponent } from './pessoas.component';
import { CriarPessoaComponent } from './criar-pessoa/criar-pessoa.component';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { DetalhesPessoaComponent } from './detalhes-pessoa/detalhes-pessoa.component';
import { FiltrarEnderecoPrincipalPipe } from './filtrar-endereco-principal.pipe';
import { AdicionarEnderecoComponent } from './adicionar-endereco/adicionar-endereco.component';
import { EditarEnderecoComponent } from './editar-endereco/editar-endereco.component';


@NgModule({
  declarations: [
    PessoasComponent,
    CriarPessoaComponent,
    EditarPessoaComponent,
    DetalhesPessoaComponent,
    FiltrarEnderecoPrincipalPipe,
    AdicionarEnderecoComponent,
    EditarEnderecoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  exports: [
    PessoasComponent,
    CriarPessoaComponent,
    EditarPessoaComponent,
    DetalhesPessoaComponent
  ]
})
export class PessoasModule { }

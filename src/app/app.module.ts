
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmacaoDialogModule } from './components/confirmacao-dialog/confirmacao-dialog.module';

import { PessoasModule } from './components/pessoas/pessoas.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PessoasModule,
    ConfirmacaoDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

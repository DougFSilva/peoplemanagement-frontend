import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { ConfirmacaoDialogComponent } from './confirmacao-dialog.component';

@NgModule({
  declarations: [ConfirmacaoDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    ConfirmacaoDialogComponent
  ]
})
export class ConfirmacaoDialogModule { }

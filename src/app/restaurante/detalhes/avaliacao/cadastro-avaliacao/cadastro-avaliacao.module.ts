import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroAvaliacaoPageRoutingModule } from './cadastro-avaliacao-routing.module';

import { CadastroAvaliacaoPage } from './cadastro-avaliacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroAvaliacaoPageRoutingModule
  ],
  declarations: [CadastroAvaliacaoPage]
})
export class CadastroAvaliacaoPageModule {}

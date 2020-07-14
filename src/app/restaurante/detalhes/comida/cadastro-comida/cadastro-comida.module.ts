import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroComidaPageRoutingModule } from './cadastro-comida-routing.module';

import { CadastroComidaPage } from './cadastro-comida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroComidaPageRoutingModule
  ],
  declarations: [CadastroComidaPage]
})
export class CadastroComidaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroRestaurantePageRoutingModule } from './cadastro-restaurante-routing.module';

import { CadastroRestaurantePage } from './cadastro-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroRestaurantePageRoutingModule
  ],
  declarations: [CadastroRestaurantePage]
})
export class CadastroRestaurantePageModule {}

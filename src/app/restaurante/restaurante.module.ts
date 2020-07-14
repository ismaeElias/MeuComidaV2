import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestauranteDetailPageRoutingModule } from './restaurante-routing.module';

import { RestaurantePage } from './restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestauranteDetailPageRoutingModule
  ],
  declarations: [RestaurantePage]
})
export class RestaurantePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhePedidoPageRoutingModule } from './detalhe-pedido-routing.module';

import { DetalhePedidoPage } from './detalhe-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhePedidoPageRoutingModule
  ],
  declarations: [DetalhePedidoPage]
})
export class DetalhePedidoPageModule {}

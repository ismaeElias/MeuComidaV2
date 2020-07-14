import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComidaDetailPageRoutingModule } from './comida-routing.module';

import { ComidaPage } from './comida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComidaDetailPageRoutingModule
  ],
  declarations: [ComidaPage]
})
export class ComidaPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroAvaliacaoPage } from './cadastro-avaliacao.page';
import { AvaliacaoPage } from '../avaliacao.page';

const routes: Routes = [
  {
    path: '',    component: CadastroAvaliacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroAvaliacaoPageRoutingModule {}

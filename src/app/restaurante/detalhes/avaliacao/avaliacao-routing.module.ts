import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoPage } from './avaliacao.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacaoPage
  },
  {
    path: 'cadastro-avaliacao',
    loadChildren: () => import('./cadastro-avaliacao/cadastro-avaliacao.module').then( m => m.CadastroAvaliacaoPageModule)
  },
  {
    path: 'cadastro-avaliacao/:id',
    loadChildren: () => import('./cadastro-avaliacao/cadastro-avaliacao.module').then( m => m.CadastroAvaliacaoPageModule)
  } 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliacaoPageRoutingModule {}

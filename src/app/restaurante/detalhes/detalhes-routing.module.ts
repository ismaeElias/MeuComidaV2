import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesPage } from './detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPage
  },
  {
    path: 'comida',
    loadChildren: () => import('./comida/comida.module').then( m => m.ComidaPageModule)
  },
  {
    path: 'avaliacao',
    loadChildren: () => import('./avaliacao/avaliacao.module').then( m => m.AvaliacaoPageModule)
  },
  {
    path: 'avaliacao/:id',
    loadChildren: () => import('./avaliacao/avaliacao.module').then( m => m.AvaliacaoPageModule)
  },
  {
    path: 'comida/:id',
    loadChildren: () => import('./comida/comida.module').then( m => m.ComidaPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesPageRoutingModule {}

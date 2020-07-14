import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComidaPage } from './comida.page';

const routes: Routes = [
  {
    path: '',
    component: ComidaPage
  },
  {
    path: 'cadastro-comida',
    loadChildren: () => import('./cadastro-comida/cadastro-comida.module').then( m => m.CadastroComidaPageModule)
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'detalhes/:id',
    loadChildren: () => import('./detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'cadastro-comida/:id',
    loadChildren: () => import('./cadastro-comida/cadastro-comida.module').then( m => m.CadastroComidaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComidaDetailPageRoutingModule {}

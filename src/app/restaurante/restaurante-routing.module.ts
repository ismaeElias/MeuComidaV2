import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantePage } from './restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantePage
  },
  {
    path: 'cadastro-restaurante',
    loadChildren: () => import('./cadastro-restaurante/cadastro-restaurante.module').then( m => m.CadastroRestaurantePageModule)
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'detalhes/:id',
    loadChildren: () => import('./detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestauranteDetailPageRoutingModule {}

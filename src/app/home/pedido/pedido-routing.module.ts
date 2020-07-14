import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoPage } from './pedido.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoPage
  },
  {
    path: 'detalhe-pedido',
    loadChildren: () => import('./detalhe-pedido/detalhe-pedido.module').then( m => m.DetalhePedidoPageModule)
  },
  {
    path: 'detalhe-pedido/:id',
    loadChildren: () => import('./detalhe-pedido/detalhe-pedido.module').then( m => m.DetalhePedidoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPageRoutingModule {}

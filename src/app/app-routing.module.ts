import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  
  { path: 'restaurante', loadChildren: () => import('./restaurante/restaurante.module').then( m => m.RestaurantePageModule)},
  {
    path: 'home/perfil',
    loadChildren: () => import('./home/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  { path: 'home/perfil/:id', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'pedido',
    loadChildren: () => import('./home/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'home/pedido/:id',
    loadChildren: () => import('./home/pedido/pedido.module').then( m => m.PedidoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroUsuarioPage } from './cadastro-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroUsuarioPageRoutingModule {}

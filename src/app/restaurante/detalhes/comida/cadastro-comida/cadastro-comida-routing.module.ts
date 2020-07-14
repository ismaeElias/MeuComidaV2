import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComidaPage } from './cadastro-comida.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroComidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroComidaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PesquisaMotoristaComponent } from './pesquisa-motorista/pesquisa-motorista.component';
import { CadastroMotoristaComponent } from './cadastro-motorista/cadastro-motorista.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaMotoristaComponent
  },
  {
    path: 'cadastro',
    component: CadastroMotoristaComponent
  },
  {
    path: ':id',
    component: CadastroMotoristaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristaRoutingModule {
}

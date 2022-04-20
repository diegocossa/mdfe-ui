import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PesquisaSeguradoraComponent } from './pesquisa-seguradora/pesquisa-seguradora.component';
import { CadastroSeguradoraComponent } from './cadastro-seguradora/cadastro-seguradora.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaSeguradoraComponent
  },
  {
    path: 'cadastro',
    component: CadastroSeguradoraComponent
  },
  {
    path: ':id',
    component: CadastroSeguradoraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguradoraRoutingModule {
}

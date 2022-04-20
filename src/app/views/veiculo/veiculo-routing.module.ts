import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaVeiculoComponent } from './pesquisa-veiculo/pesquisa-veiculo.component';
import { CadastroVeiculoComponent } from './cadastro-veiculo/cadastro-veiculo.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaVeiculoComponent
  },
  {
    path: 'cadastro',
    component: CadastroVeiculoComponent
  },
  {
    path: ':id',
    component: CadastroVeiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculoRoutingModule {
}

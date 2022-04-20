import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroMdfeComponent } from './cadastro-mdfe/cadastro-mdfe.component';

const routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroMdfeComponent
  },
  {
    path: ':id',
    component: CadastroMdfeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MdfeRoutingModule {
}

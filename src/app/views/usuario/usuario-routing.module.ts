import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaUsuarioComponent } from './pesquisa-usuario/pesquisa-usuario.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { AlterarSenhaUsuarioComponent } from "./alterar-senha-usuario/alterar-senha-usuario.component";

const routes: Routes = [
  {
    path: '',
    component: PesquisaUsuarioComponent
  },
  {
    path: 'cadastro',
    component: CadastroUsuarioComponent
  },
  {
    path: 'alterar-senha',
    component: AlterarSenhaUsuarioComponent
  },
  {
    path: ':id',
    component: CadastroUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}

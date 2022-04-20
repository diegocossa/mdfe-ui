import { NgModule } from '@angular/core';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { PesquisaUsuarioComponent } from './pesquisa-usuario/pesquisa-usuario.component';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaUsuarioComponent } from './alterar-senha-usuario/alterar-senha-usuario.component';

@NgModule({
  imports: [
    SharedModule,
    UsuarioRoutingModule
  ],
  declarations: [CadastroUsuarioComponent, PesquisaUsuarioComponent, AlterarSenhaUsuarioComponent]
})
export class UsuarioModule {
}

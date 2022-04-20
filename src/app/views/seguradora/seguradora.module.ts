import { NgModule } from '@angular/core';

import { SeguradoraRoutingModule } from './seguradora-routing.module';
import { PesquisaSeguradoraComponent } from './pesquisa-seguradora/pesquisa-seguradora.component';
import { CadastroSeguradoraComponent } from './cadastro-seguradora/cadastro-seguradora.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SeguradoraRoutingModule
  ],
  declarations: [PesquisaSeguradoraComponent, CadastroSeguradoraComponent]
})
export class SeguradoraModule {
}

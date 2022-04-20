import { NgModule } from '@angular/core';

import { MotoristaRoutingModule } from './motorista-routing.module';
import { CadastroMotoristaComponent } from './cadastro-motorista/cadastro-motorista.component';
import { PesquisaMotoristaComponent } from './pesquisa-motorista/pesquisa-motorista.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MotoristaRoutingModule
  ],
  declarations: [CadastroMotoristaComponent, PesquisaMotoristaComponent]
})
export class MotoristaModule {
}

import { NgModule } from '@angular/core';

import { VeiculoRoutingModule } from './veiculo-routing.module';
import { CadastroVeiculoComponent } from './cadastro-veiculo/cadastro-veiculo.component';
import { PesquisaVeiculoComponent } from './pesquisa-veiculo/pesquisa-veiculo.component';
import { SharedModule } from '../../shared/shared.module';
import {UppercaseInputDirective} from "../../shared/directives/input-upper-case.directive";

@NgModule({
  imports: [
    SharedModule,
    VeiculoRoutingModule
  ],
  declarations: [CadastroVeiculoComponent, PesquisaVeiculoComponent, UppercaseInputDirective]
})
export class VeiculoModule {
}

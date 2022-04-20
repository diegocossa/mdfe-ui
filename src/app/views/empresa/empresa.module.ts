import { NgModule } from '@angular/core';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { PesquisaEmpresaComponent } from './pesquisa-empresa/pesquisa-empresa.component';
import { SharedModule } from '../../shared/shared.module';
import { CertificadoCadastroComponent } from './certificado-cadastro/certificado-cadastro.component';
import { CertificadoPesquisaComponent } from './certificado-pesquisa/certificado-pesquisa.component';
import { ConfiguracoesEmpresaComponent } from './configuracoes-empresa/configuracoes-empresa.component';

@NgModule({
  imports: [
    SharedModule,

    EmpresaRoutingModule
  ],
  declarations: [CadastroEmpresaComponent, PesquisaEmpresaComponent, CertificadoCadastroComponent, CertificadoPesquisaComponent, ConfiguracoesEmpresaComponent]
})
export class EmpresaModule {
}

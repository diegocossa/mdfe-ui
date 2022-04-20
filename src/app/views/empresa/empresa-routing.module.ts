import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { PesquisaEmpresaComponent } from './pesquisa-empresa/pesquisa-empresa.component';
import { CertificadoCadastroComponent } from './certificado-cadastro/certificado-cadastro.component';
import { CertificadoPesquisaComponent } from './certificado-pesquisa/certificado-pesquisa.component';
import {ConfiguracoesEmpresaComponent} from "./configuracoes-empresa/configuracoes-empresa.component";

const routes: Routes = [
  {
    path: '',
    component: PesquisaEmpresaComponent
  },
  {
    path: 'cadastro',
    component: CadastroEmpresaComponent
  },
  {
    path: ':id',
    component: CadastroEmpresaComponent
  },
  {
    path: 'configuracoes/:id',
    component: ConfiguracoesEmpresaComponent
  },
  {
    path: 'certificado/cadastro/:id',
    component: CertificadoCadastroComponent,
    data: {
      state: 'empresa-certificado-cadastro'
    }
  },
  {
    path: 'certificado/pesquisa/:id',
    component: CertificadoPesquisaComponent,
    data: {
      state: 'empresa-certificado-pesquisa'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule {
}

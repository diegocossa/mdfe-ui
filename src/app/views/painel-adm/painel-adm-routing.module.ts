import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MigracaoComponent} from "./migracao/migracao.component";
import {PesquisaUsuariosPublicComponent} from "./pesquisa-usuarios-public/pesquisa-usuarios-public.component";

const routes: Routes = [
  {
    path: 'pesquisa-usuarios-public',
    component: PesquisaUsuariosPublicComponent
  },
  {
    path: 'migracao',
    component: MigracaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelAdmRoutingModule { }

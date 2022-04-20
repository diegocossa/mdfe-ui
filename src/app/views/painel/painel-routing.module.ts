import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelComponent } from './painel/painel.component';

const routes: Routes = [
  {
    path: '',
    component: PainelComponent
  },
  {
    path: ':idEmpresaLogada',
    component: PainelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule {
}

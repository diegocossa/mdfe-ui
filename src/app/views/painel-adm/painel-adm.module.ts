import {NgModule} from '@angular/core';

import {PainelAdmRoutingModule} from './painel-adm-routing.module';
import {MigracaoComponent} from './migracao/migracao.component';
import {SharedModule} from "../../shared/shared.module";
import { PesquisaUsuariosPublicComponent } from './pesquisa-usuarios-public/pesquisa-usuarios-public.component';
import { ModalSenhaAdmComponent } from './modal-senha-adm/modal-senha-adm.component';

@NgModule({
  imports: [
    SharedModule,
    PainelAdmRoutingModule
  ],
  declarations: [MigracaoComponent, PesquisaUsuariosPublicComponent, ModalSenhaAdmComponent],
  entryComponents: [ModalSenhaAdmComponent]
})
export class PainelAdmModule { }

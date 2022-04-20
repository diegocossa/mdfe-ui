import { NgModule } from '@angular/core';

import { PainelRoutingModule } from './painel-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { PainelComponent } from './painel/painel.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../shared/shared.module";
import {MdfeModule} from "../mdfe/mdfe.module";

@NgModule({
  imports: [
    SharedModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    PainelRoutingModule,
    MdfeModule
  ],
  declarations: [PainelComponent]
})
export class PainelModule {
}

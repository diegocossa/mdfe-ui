import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';
import { FeatherIconComponent } from './feather-icon/feather-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SearchModule } from './search/search.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LayoutsModule } from './layouts/layouts.module';
import { TableComponent } from './table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RemoveConfirmModalComponent } from './util/remove-confirm-modal/remove-confirm-modal.component';

const components = [
  BtnLoadingComponent,
  FeatherIconComponent,
  TableComponent,
  RemoveConfirmModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SearchModule,
    PerfectScrollbarModule,
    NgbModule,

    /* Dependências do Table Component */
    NgxPaginationModule,
    NgxDatatableModule
  ],
  declarations: components,
  exports: components,
  entryComponents: [
    RemoveConfirmModalComponent
  ]
})
export class SharedComponentsModule {
}

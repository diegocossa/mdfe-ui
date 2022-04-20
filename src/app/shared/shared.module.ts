import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from './components/search/search.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from './providers/custom-validators-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,

    PerfectScrollbarModule,
    SearchModule,

    ToastrModule.forRoot(),
    NgxMaskModule.forRoot({
      clearIfNotMatch: false,
      dropSpecialCharacters: true,
      showMaskTyped: true
    }),
    NgSelectModule,
    NgBootstrapFormValidationModule.forRoot(),

    NgbModule,

    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,

    RouterModule,
    ToastrModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxMaskModule,
    NgSelectModule,
    NgBootstrapFormValidationModule,
    NgbModule,

    SharedPipesModule,
    SharedComponentsModule
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    }
  ]
})
export class SharedModule {
}

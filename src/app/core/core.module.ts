import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppHttp} from "../shared/services/auth/app-http";
import {AuthService} from "../shared/services/auth/auth.service";
import {AuthGuard} from "../shared/services/auth/guards/auth.guard";
import {EmpresaGuard} from "../shared/services/auth/guards/empresa.guard";
import {RoleGuard} from "../shared/services/auth/guards/role.guard";
import {LogoutService} from "../shared/services/auth/logout.service";
import {ControleEmpresaLogadaService} from "../shared/services/auth/controles/controle-empresa-logada.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AppHttp,
    AuthService,

    /* Guardas */
    AuthGuard,
    EmpresaGuard,
    RoleGuard,

    LogoutService,
    ControleEmpresaLogadaService
  ]
})
export class CoreModule { }

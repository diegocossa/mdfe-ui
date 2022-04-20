import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { AdminLayoutSidebarCompactComponent } from './shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component';
import { AuthGuard } from './shared/services/auth/guards/auth.guard';
import {EmpresaGuard} from "./shared/services/auth/guards/empresa.guard";

const adminRoutes: Routes = [
  {
    path: 'empresa',
    loadChildren: './views/empresa/empresa.module#EmpresaModule'
  },
  {
    path: 'motorista',
    loadChildren: './views/motorista/motorista.module#MotoristaModule'
  },
  {
    path: 'veiculo',
    loadChildren: './views/veiculo/veiculo.module#VeiculoModule'
  },
  {
    path: 'seguradora',
    loadChildren: './views/seguradora/seguradora.module#SeguradoraModule'
  },
  {
    path: 'usuario',
    canActivate: [EmpresaGuard],
    loadChildren: './views/usuario/usuario.module#UsuarioModule'
  },
  {
    path: 'painel',
    canActivate: [EmpresaGuard],
    loadChildren: './views/painel/painel.module#PainelModule'
  },
  {
    path: 'mdfe',
    canActivate: [EmpresaGuard],
    loadChildren: './views/mdfe/mdfe.module#MdfeModule'
  },
  {
    path: 'painel-adm',
    loadChildren: './views/painel-adm/painel-adm.module#PainelAdmModule'
  }
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'painel',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule'
      }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'others',
        loadChildren: './views/others/others.module#OthersModule'
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutSidebarCompactComponent,
    canActivate: [AuthGuard],
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'others/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

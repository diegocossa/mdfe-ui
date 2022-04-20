import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ControleEmpresaLogadaService } from '../controles/controle-empresa-logada.service';
import { ToastService } from '../../util/toast.service';

@Injectable()
export class EmpresaGuard implements CanActivate {

  constructor(private controleEmpresaLogadaService: ControleEmpresaLogadaService,
              private toast: ToastService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.validarEmpresaLogada();
  }

  validarEmpresaLogada(): Promise<boolean> {
    return this.controleEmpresaLogadaService.validarEmpresaLogada(true)
      .then(response => {
        if (response) {
          return true;
        }
        this.toast.warning('Preciso que você selecione ou cadastre uma empresa!');
        this.router.navigate(['/empresa/cadastro']);
        return false;
      })
      .catch(() => {
        return false;
      });
  }

}

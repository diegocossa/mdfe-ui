import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.tenhoPermissaoParaAcessar(next);

  }

  tenhoPermissaoParaAcessar(next: ActivatedRouteSnapshot): Promise<boolean> {
    if (!next.data.paginaPrincipal &&
      next.data.roles &&
      !this.auth.hasAnyAuthority(next.data.roles)) {

      this.router.navigate(['/forbidden']);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
}

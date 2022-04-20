import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingService } from '../../util/loading.service';

/**
 * Guarda as rotas para validar permissões de acesso e se o usuário está logado.
 * */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return this.validarToken();

  }

  validarToken() {
    this.loadingService.show();
    if (this.auth.isAccessTokenInvalid()) {
      return this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalid()) {
            this.router.navigate(['/sessions/signin']);
            this.loadingService.dismiss();
            return Promise.reject(false);
          }
          return Promise.resolve(true);
        })
        .catch(() => {
          this.router.navigate(['/sessions/signin']);
          this.loadingService.dismiss();
          return Promise.reject(false);
        });
    } else {
      this.loadingService.dismiss();
      return Promise.resolve(true);
    }
  }

}

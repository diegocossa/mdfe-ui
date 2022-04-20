import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { from as observableFromPromise, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { LoadingService } from '../util/loading.service';

export class NotAuthenticatedError {
}

/**
 * AppHttp intercepta todas as requisições HttpClient para checar se o token está
 * válido na requisição, caso não esteja válido, ele tentará requisitar um novo
 * access_token na API com o refresh_token.
 * */
@Injectable()
export class AppHttp extends HttpClient {
  constructor(private auth: AuthService,
              private httpHandler: HttpHandler,
              private loadingService: LoadingService) {
    super(httpHandler);
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
  }

  get<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.get<T>(url, options));
  }

  head<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.head<T>(url, options));
  }

  options<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.options<T>(url, options));
  }

  patch<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.patch<T>(url, body, options));
  }

  post<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
  }

  put<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
  }

  /**
   * Intercepta todas as requisições com este método.
   * @param func função a ser executada após a validação.
   * @return Observable<T> da função que será executada.
   * */
  private fazerRequisicao<T>(func: Function): Observable<T> {
    this.loadingService.show();
    if (this.auth.isAccessTokenInvalid()) {
      /**
       * Chama um novo access_token caso o atual esteja inválido, checa
       * se o novo será válido e libera a requisição.
       * */
      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalid()) {
            throw new NotAuthenticatedError();
          }
          return func().toPromise()
            .then(data => {
              this.loadingService.dismiss();
              return Promise.resolve(data);
            })
            .catch(err => {
              this.loadingService.dismiss();
              return Promise.reject(err);
            });
        });

      return observableFromPromise(chamadaNovoAccessToken);
    } else {
      return observableFromPromise(func().toPromise()
        .then(data => {
          this.loadingService.dismiss();
          return Promise.resolve(data);
        })
        .catch(err => {
          this.loadingService.dismiss();
          return Promise.reject(err);
        }));
    }
  }
}

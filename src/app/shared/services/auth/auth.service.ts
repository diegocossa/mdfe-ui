import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParameterCodec, HttpParams} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingService } from '../util/loading.service';
import { environment } from '../../../../environments/environment';

export class UsuarioLogin {
  email: string;
  senha: string;
}

/**
 * AuthService: responsável pelo login com o JWT.
 * */
@Injectable()
export class AuthService {

  URL = environment.WebService.URLAuth.Login;
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private loadingService: LoadingService) {
    this.carregarToken();
  }

  /**
   * Realiza o login na aplicação, buscando um access_token válido.
   * @param user UsuarioLogin da aplicação.
   * @return Promise<void> armazena o access_token.
   * */
  login(user: UsuarioLogin): Promise<void> {
    this.loadingService.show();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic bWRmZV9hbmd1bGFyOjg6RHQsZHk+PHFVYWUlZDhSO20rRmw7I2lbQWFKIzopQENlemd9dWQ=');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let httpParams = new HttpParams({ encoder: new CustomEncoder() });
    httpParams = httpParams.set('username', user.email);
    httpParams = httpParams.set('password', user.senha);
    httpParams = httpParams.set('grant_type', 'password');

    return this.http.post<any>(this.URL, httpParams, {headers, withCredentials: true}).toPromise()
      .then(res => {
        this.armazenarToken(res.access_token);
        this.guardarEmpresaPadrao();
        this.carregaUltimaEmpresaLogada();
        this.loadingService.dismiss();
      })
      .catch(err => {
        this.loadingService.dismiss();
        if (err.status === 400) {
          if (err.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(err);
      });
  }

  /**
   * Obtem um novo access_token da rota configurada.
   * @return Promise<void>, caso o token seja válido armazena.
   * */
  obterNovoAccessToken(): Promise<boolean> {
    this.loadingService.show();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic bWRmZV9hbmd1bGFyOjg6RHQsZHk+PHFVYWUlZDhSO20rRmw7I2lbQWFKIzopQENlemd9dWQ=');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.URL, body, {headers, withCredentials: true}).toPromise()
      .then(res => {
        this.loadingService.dismiss();
        this.armazenarToken(res.access_token);
        return Promise.resolve(true);
      })
      .catch(() => {
        this.loadingService.dismiss();
        return Promise.reject();
      });
  }

  /**
   * Checa se o token do LocalStorage é válido.
   * @return true se for válido e false se não for.
   * */
  isAccessTokenInvalid() {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  /**
   * Checa se o usuário tem determinada permissão.
   * @param permissao Descrição completa da permissão do usuário.
   * @return true se houver a permissão e false se não houver.
   * */
  hasAuthority(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  /**
   * Checa se o usuário tem qualquer uma das permissões passadas no array de roles.
   * @param roles array contendo as permissões do usuário.
   * */
  hasAnyAuthority(roles) {
    for (const role of roles) {
      if (this.hasAuthority(role)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Armazena o token no local storage e no serviço.
   * @param token Enviar o access_token para o método.
   * */
  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  /**
   * Armazena a empresa padrão do usuário ao logar apenas.
   * */
  private guardarEmpresaPadrao() {
    localStorage.setItem('cnxe', this.jwtPayload.CNXE.toString());
  }

  /**
   * Carrega o token do LocalStorage, caso tenha, armazena o token no serviço.
   * */
  private carregarToken() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  /**
   * Busca no localstorage se há uma ultima empresa logada, caso sim, seta-a, caso
   * não tenha, pega a padrão.
   * */
  private carregaUltimaEmpresaLogada() {
    localStorage.setItem('empresaLogada', localStorage.getItem('ultimaEmpresaLogada'));
    if (!localStorage.getItem('empresaLogada')) {
      localStorage.setItem('empresaLogada', this.jwtPayload.CNXE.toString());
    }
  }

  /**
   * Usado para o serviço de logout.
   * */
  limparAccessToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('cnxe');
    localStorage.removeItem('empresaLogada');
    this.jwtPayload = null;
  }

}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}


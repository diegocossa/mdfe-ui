import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NovaSenha } from '../../models/usuario/nova.senha';
import { Usuario } from '../../models/usuario/usuario';
import { Pageable } from '../../models/util/pageable';

export class UsuarioFilter extends Pageable {
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  URL = environment.WebService.URLUsuario;

  resetaSenha(email: string): Promise<void> {

    return this.http.post<void>(`${this.URL}/reset/senha`, {'email': email}).toPromise();
  }

  salvarSenha(novaSenha: NovaSenha): Promise<void> {

    return this.http.post<void>(`${this.URL}/nova/senha`, novaSenha).toPromise();
  }

  save(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(`${this.URL}`, usuario).toPromise();
  }

  update(usuario: Usuario): Promise<Usuario> {
    return this.http.put<Usuario>(`${this.URL}/${usuario.idpessoa}`, usuario).toPromise();
  }

  delete(idusuario: number): Promise<Usuario> {
    return this.http.delete<Usuario>(`${this.URL}/${idusuario}`).toPromise();
  }

  filter(filter: UsuarioFilter): Promise<any> {
    let {params, headers} = this.prepareOptions(filter);

    return this.http.get<any>(`${this.URL}?filter`, {headers, params}).toPromise()
      .then(response => {
        const usuarios = response.content;
        const results = {
          usuarios,
          total: response.totalElements
        };
        return results;
      });
  }

  filterOnPublic(filter: UsuarioFilter): Promise<any> {
    let {params, headers} = this.prepareOptions(filter);

    return this.http.get<any>(`${this.URL}?filterOnPublic`, {headers, params}).toPromise()
      .then(response => {
        const usuarios = response.content;
        const results = {
          usuarios,
          total: response.totalElements
        };
        return results;
      });
  }

  private prepareOptions(filter: UsuarioFilter) {
    let params = new HttpParams();

    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.size.toString());

    if (filter.nome) {
      params = params.append('nome', filter.nome);
    }

    if (filter.email) {
      params = params.append('email', filter.email);
    }

    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));
    return {params, headers};
  }

  findById(id: number): Promise<Usuario> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URL}/${id}`, {headers}).toPromise();
  }

  alterarSenha(alterarSenha: AlterarSenha): Promise<Usuario> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.put<Usuario>(`${this.URL}/alterarSenha`, alterarSenha, {headers}).toPromise();
  }
}

export class AlterarSenha {
  usuario: Usuario;
  senhaAnterior: string;
  novaSenha: string;
}

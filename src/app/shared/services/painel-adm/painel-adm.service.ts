import { Injectable } from '@angular/core';
import {AppHttp} from "../auth/app-http";
import {environment} from "../../../../environments/environment";
import {Usuario} from "../../models/usuario/usuario";

@Injectable({
  providedIn: 'root'
})
export class PainelAdmService {

  constructor(private http: AppHttp) { }

  URL = environment.WebServicePainelAdministrativo.URLMigracao;

  criarMigracao(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.URL, usuario).toPromise();
  }

}

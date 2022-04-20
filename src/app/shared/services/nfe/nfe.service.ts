import { Injectable } from '@angular/core';
import {AppHttp} from "../auth/app-http";
import {environment} from "../../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NFeService {

  constructor(private http: AppHttp) { }

  URLUtil = environment.WebService.URLAuxiliarNFe;
  URL = environment.WebService.URLConsultaNFe;

  consultarCampos(xmlNota: FormData): Promise<any> {
    return this.http.post(this.URLUtil, xmlNota).toPromise();
  }

  consultarNFe(chave: string): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get(`${this.URL}/consultar/nota/${chave}`, { headers }).toPromise();
  }
}

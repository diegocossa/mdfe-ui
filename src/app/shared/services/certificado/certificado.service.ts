import { Injectable } from '@angular/core';
import { Certificado } from '../../models/certificado/certificado';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AppHttp } from '../auth/app-http';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  constructor(private http: AppHttp) {
  }

  URL = environment.WebService.URLCertificados;

  save(certificadoFormData: FormData, idempresa: number): Promise<Certificado> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', idempresa.toString());

    return this.http.post<Certificado>(`${this.URL}`, certificadoFormData, {headers}).toPromise();
  }

  deleteCertificado(idcertificado: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.delete<void>(`${this.URL}/${idcertificado}`, {headers}).toPromise();
  }

  findByIdEmpresa(idempresa: number): Promise<Certificado> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', idempresa.toString());
    return this.http.get<Certificado>(`${this.URL}/empresa/${idempresa}`, {headers}).toPromise();
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Pageable } from '../../models/util/pageable';
import { AppHttp } from '../auth/app-http';
import { environment } from '../../../../environments/environment';
import { Seguradora } from '../../models/seguradora/seguradora';

export class SeguradoraFilter extends Pageable {
  cnpjseguradora: string;
  numeroapolice: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeguradoraService {

  constructor(private http: AppHttp) {
  }

  URL = environment.WebService.URLSeguradoras;

  filter(filter: SeguradoraFilter): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.size.toString());

    if (filter.cnpjseguradora) {
      params = params.append('cnpjseguradora', filter.cnpjseguradora);
    }

    if (filter.numeroapolice) {
      params = params.append('numeroapolice', filter.numeroapolice);
    }

    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URL}?filter`, {headers, params}).toPromise()
      .then(response => {
        const seguradoras = response.content;
        const results = {
          seguradoras,
          total: response.totalElements
        };
        return results;
      });
  }

  findById(id: number): Promise<Seguradora> {
    return this.http.get<any>(`${this.URL}/${id}`).toPromise();
  }

  findAll(): Promise<Array<Seguradora>> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<Array<Seguradora>>(`${this.URL}`, {headers}).toPromise();
  }

  save(seguradora: Seguradora): Promise<Seguradora> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.post<Seguradora>(`${this.URL}`, seguradora, {headers}).toPromise();
  }

  delete(idSeguradora: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.delete(`${this.URL}/${idSeguradora}`, {headers}).toPromise().then(() => null);
  }

  update(seguradora: Seguradora): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.put<any>(`${this.URL}/${seguradora.idSeguradora}`, seguradora, {headers}).toPromise();
  }
}

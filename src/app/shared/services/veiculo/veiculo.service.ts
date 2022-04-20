import { Injectable } from '@angular/core';
import { AppHttp } from '../auth/app-http';

import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Pageable } from '../../models/util/pageable';
import { environment } from '../../../../environments/environment';
import { Veiculo } from '../../models/veiculo/veiculo';
import { VeiculoReboque } from '../../models/mdfe/veiculo-reboque';
import { promise } from 'selenium-webdriver';

export class VeiculoFilter extends Pageable {
  placa: string;
  veiculoTipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(private http: AppHttp) {
  }

  URL = environment.WebService.URLVeiculos;

  filter(filter: VeiculoFilter): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.size.toString());

    if (filter.veiculoTipo) {
      params = params.append('veiculoTipo', filter.veiculoTipo);
    }

    if (filter.placa) {
      params = params.append('nome', filter.placa);
    }

    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URL}?filter`, {headers, params}).toPromise()
      .then(response => {
        const veiculos = response.content;
        const results = {
          veiculos,
          total: response.totalElements
        };
        return results;
      });
  }

  findById(id: number): Promise<Veiculo> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URL}/${id}`, {headers}).toPromise();
  }

  findAll(): Promise<Array<Veiculo>> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<Array<Veiculo>>(`${this.URL}`, {headers}).toPromise();
  }

  save(veiculo: Veiculo): Promise<Veiculo> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.post<Veiculo>(`${this.URL}`, veiculo, {headers}).toPromise();
  }

  delete(idveiculo: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.delete(`${this.URL}/${idveiculo}`, {headers}).toPromise().then(() => null);
  }

  update(veiculo: Veiculo): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.put<any>(`${this.URL}/${veiculo.idveiculo}`, veiculo, {headers}).toPromise();
  }

  findTracoes(): Promise<Array<Veiculo>> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<Array<Veiculo>>(`${this.URL}/tracao`, {headers}).toPromise();
  }

  findReboques(): Promise<Array<Veiculo>> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<Array<Veiculo>>(`${this.URL}/reboque`, {headers}).toPromise();
  }

  findVeiculoReboque(): Promise<Array<VeiculoReboque>> {
    return this.findReboques()
      .then(response => {
        if (!response) {
          return Promise.reject(null);
        }

        const veiculoReboques = new Array<VeiculoReboque>();
        response.forEach(x => {
          veiculoReboques.push({veiculo: x});
        });
        return Promise.resolve(veiculoReboques);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Pageable } from '../../models/util/pageable';
import { AppHttp } from '../auth/app-http';
import { environment } from '../../../../environments/environment';
import { Motorista } from '../../models/motorista/motorista';
import { Condutor } from '../../models/mdfe/condutor';

export class MotoristaFilter extends Pageable {
  cpf: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  constructor(private http: AppHttp) {
  }

  URL = environment.WebService.URLMotoristas;

  findById(id: number): Promise<Motorista> {
    return this.http.get<any>(`${this.URL}/${id}`).toPromise();
  }

  filter(filter: MotoristaFilter): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.size.toString());

    if (filter.cpf) {
      params = params.append('cpf', filter.cpf);
    }

    if (filter.nome) {
      params = params.append('nome', filter.nome);
    }

    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URL}?filter`, {headers, params}).toPromise()
      .then(response => {
        const motoristas = response.content;
        const results = {
          motoristas,
          total: response.totalElements
        };
        return results;
      });
  }

  findAll(): Promise<Array<Motorista>> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<Array<Motorista>>(`${this.URL}`, {headers}).toPromise();
  }

  findCondutores(): Promise<Array<Condutor>> {
    return this.findAll()
      .then(response => {
        const condutores = new Array<Condutor>();
        if (response) {
          response.forEach(x => {
            condutores.push({motorista: x});
          });
        }
        return Promise.resolve(condutores);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  save(motorista: Motorista): Promise<Motorista> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.post<Motorista>(`${this.URL}`, motorista, {headers}).toPromise();
  }

  delete(idmotorista: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.delete(`${this.URL}/${idmotorista}`, {headers}).toPromise().then(() => null);
  }

  update(motorista: Motorista): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.put<any>(`${this.URL}/${motorista.idmotorista}`, motorista, {headers}).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { AppHttp } from '../auth/app-http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Veiculo } from '../../models/veiculo/veiculo';
import { Proprietario } from '../../models/veiculo/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  constructor(private http: AppHttp) {
  }

  URL = environment.WebService.URLVeiculos + '/proprietario';

  findByVeiculo(veiculo: Veiculo): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URL}/${veiculo.idveiculo}`, {headers}).toPromise();
  }

  save(proprietario: Proprietario): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.post<any>(`${this.URL}`, proprietario, {headers}).toPromise();
  }
}

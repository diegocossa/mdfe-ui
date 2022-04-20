import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { environment } from '../../../../environments/environment';

export class UF {
  id: number;
  nome: string;
  sigla: string;
}

export class Municipio {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class IBGEService {

  constructor(private http: HttpClient,
              private loadingService: LoadingService) {
  }

  URL = environment.WebService.URLEstados;
  URLMun = environment.WebService.URLMunicipios;

  getUFs(): Promise<Array<UF>> {
    this.loadingService.show();
    return this.http.get<any>(`${this.URL}`).toPromise()
      .then(response => {
        this.loadingService.dismiss();
        return Promise.resolve(response);
      });
  }

  getMunicipios(idUF: number): Promise<Array<Municipio>> {
    this.loadingService.show();
    return this.http.get<any>(`${this.URLMun}/estado/${idUF}`).toPromise()
      .then(response => {
        this.loadingService.dismiss();
        return Promise.resolve(response);
      });
  }

  getMunicipioById(idMunicipio: number): Promise<Municipio> {
    this.loadingService.show();
    return this.http.get<any>(`${this.URLMun}/${idMunicipio}`).toPromise()
      .then(response => {
        this.loadingService.dismiss();
        return Promise.resolve(response);
      });
  }
}

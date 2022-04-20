import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Empresa } from '../../models/empresa/empresa';
import { AppHttp } from '../auth/app-http';
import { Pageable } from '../../models/util/pageable';
import { environment } from '../../../../environments/environment';

export class EmpresaFilter extends Pageable {
  cnpj: string;
  razaosocial: string;
  fantasia: string;
}

/* ControleEmpresaLogada */

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: AppHttp) {
  }

  URL = environment.WebService.URLEmpresas;

  atualizarContadorNumeroManifesto(idEmpresa: number, contador: number): Promise<string> {
    return this.http.post<string>(`${this.URL}/atualizar/sequence/${idEmpresa}/${contador}`, null).toPromise();
  }

  getContadorAtualNumeroManifesto(idEmpresa: number): Promise<number> {
    return this.http.get<number>(`${this.URL}/contador/numeroManifesto/${idEmpresa}`).toPromise();
  }

  save(empresa: Empresa): Promise<Empresa> {
    return this.http.post<Empresa>(`${this.URL}`, empresa).toPromise();
  }

  update(empresa: Empresa): Promise<Empresa> {
    return this.http.put<Empresa>(`${this.URL}/${empresa.idempresa}`, empresa).toPromise();
  }

  delete(idempresa: number): Promise<void> {
    return this.http.delete<void>(`${this.URL}/${idempresa}`).toPromise();
  }

  filter(filter: EmpresaFilter): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.size.toString());

    if (filter.cnpj) {
      params = params.append('cnpj', filter.cnpj);
    }
    if (filter.razaosocial) {
      params = params.append('razaosocial', filter.razaosocial);
    }
    if (filter.fantasia) {
      params = params.append('fantasia', filter.fantasia);
    }

    return this.http.get<any>(`${this.URL}?filter`, {params}).toPromise()
      .then(response => {
        const empresas = response.content;
        const results = {
          empresas,
          total: response.totalElements
        };
        return results;
      });
  }

  findAll(): Promise<Array<Empresa>> {
    return this.http.get<Array<Empresa>>(`${this.URL}`).toPromise();
  }

  findById(idempresa: number): Promise<Empresa> {
    return this.http.get<Empresa>(`${this.URL}/${idempresa}`).toPromise();
  }
}

import {Injectable} from '@angular/core';
import {AppHttp} from '../auth/app-http';
import {environment} from '../../../../environments/environment';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {MDFe} from '../../models/mdfe/mdfe';
import {Pageable} from '../../models/util/pageable';
import {MDFeProjection} from "../../models/mdfe/projection/mdfe-projection";
import {Motorista} from "../../models/motorista/motorista";
import * as moment from 'moment';

export class MDFeFilter extends Pageable {
  situacao = 'GRAVADO';

  nmdf: string;
  chave: string;
  numprotocolo: string;
  serie: number;

  ufini: string;
  uffim: string;

  placa: string;
}

export class ResultResume {
  mdfes: Array<MDFeProjection>;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class MdfeService {

  constructor(private http: AppHttp) {
  }

  URL = environment.WebService.URLMDFes;
  URLTotalizadores = environment.WebService.URLTotalizadores;
  URLEventos = environment.WebService.URLEventos;
  URLDocumentos = environment.WebService.URLDocumentos;

  save(mdfe: MDFe): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));
    return this.http.post<MDFe>(`${this.URL}`, mdfe, {headers}).toPromise();
  }

  update(mdfe: MDFe): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));
    return this.http.put<MDFe>(`${this.URL}/${mdfe.idmdfe}`, mdfe, {headers}).toPromise();
  }

  delete(idmdfe: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));
    return this.http.delete<void>(`${this.URL}/${idmdfe}`, {headers}).toPromise();
  }

  filter(filter: MDFeFilter): Promise<ResultResume> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    let params = new HttpParams();

    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.size.toString());

    if (filter.situacao) {
      params = params.append('situacao', filter.situacao);
    }

    if (filter.nmdf) {
      params = params.append('nmdf', filter.nmdf);
    }

    if (filter.serie) {
      params = params.append('serie', filter.serie.toString());
    }

    if (filter.chave) {
      params = params.append('chave', filter.chave);
    }

    if (filter.numprotocolo) {
      params = params.append('numprotocolo', filter.numprotocolo);
    }

    if (filter.ufini) {
      params = params.append('ufini', filter.ufini);
    }

    if (filter.uffim) {
      params = params.append('uffim', filter.uffim);
    }

    if (filter.placa) {
      params = params.append('placa', filter.placa);
    }

    return this.http.get<any>(`${this.URL}?resume`, {params, headers}).toPromise()
      .then(response => {
        const mdfes = response.content;
        const results = new ResultResume();
        results.mdfes = mdfes;
        results.total = response.totalElements;
        return results;
      });
  }

  findAll(): Promise<Array<MDFe>> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));
    return this.http.get<Array<MDFe>>(`${this.URL}`, {headers}).toPromise();
  }

  findById(idmdfe: number): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<MDFe>(`${this.URL}/${idmdfe}`, {headers}).toPromise();
  }

  emitir(idmdfe: number): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    const datas = {
      dhemi: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
      dhiniviagem: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    };

    return this.http.put<MDFe>(`${this.URLEventos}/mdfe/enviar/${idmdfe}`, datas, {headers}).toPromise();
  }

  consultar(idmdfe: number): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<MDFe>(`${this.URLEventos}/mdfe/consultar/recibo/${idmdfe}`, {headers}).toPromise();
  }

  cancelar(idmdfe: number, motivo: string): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.post<any>(`${this.URLEventos}/mdfe/cancelar/${idmdfe}`, { motivo }, {headers}).toPromise();
  }

  encerrar(idmdfe: number, encerramento: EncerramentoMDFe): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.post<any>(`${this.URLEventos}/mdfe/encerrar/${idmdfe}`, encerramento, {headers}).toPromise();
  }

  encerrarPelaChave(encerramento: EncerramentoMDFe): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.post<any>(`${this.URLEventos}/mdfe/encerrarPelaChave`, encerramento, {headers}).toPromise();
  }

  incluirCondutor(idmdfe: number, motorista: Motorista): Promise<MDFe> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URLEventos}/mdfe/incluir/condutor/${idmdfe}/${motorista.idmotorista}`, {headers}).toPromise();
  }

  buscarTotalizadores(): Promise<Array<any>> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<Array<any>>(`${this.URLTotalizadores}/listatotais`, {headers}).toPromise();
  }

  imprimirMDFe(idmdfe: number) {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URLDocumentos}/damdfe/${idmdfe}`, { headers, responseType: 'blob' }).toPromise();
  }

  downloadXML(idmdfe: number) {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URL}/downloadxml/${idmdfe}`, { headers, responseType: 'blob' }).toPromise();
  }

  consultarNaoEncerrados(cnpj: string): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('EMP', localStorage.getItem('empresaLogada'));

    return this.http.get<any>(`${this.URLEventos}/mdfe/consulta/naoencerrados/${cnpj}`, {headers}).toPromise();
  }
}

export class EncerramentoMDFe {
  chave: string;
  numprotocolo: string;

  codigomunicipio: string;
  uf: string;
}

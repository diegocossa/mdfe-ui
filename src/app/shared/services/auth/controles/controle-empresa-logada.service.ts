import { Injectable } from '@angular/core';
import { EmpresaService } from '../../empresa/empresa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../util/error-handler.service';
import { LoadingService } from '../../util/loading.service';
import { Empresa } from '../../../models/empresa/empresa';

@Injectable()
export class ControleEmpresaLogadaService {

  constructor(private empresaService: EmpresaService,
              private errorHandler: ErrorHandlerService,
              private loadingService: LoadingService) {
  }

  empresas = [];

  empresaLogada: Empresa;
  empresaPadraoIdentificada = true;

  /** Atualiza o localStorage com uma nova empresa.
   * @param idempresa ID da empresa a setar.
   * @return Promise<boolean>...
   * */
  setEmpresaLogada(idempresa: number): Promise<boolean> {
    if (idempresa) {
      return this.empresaService.findById(idempresa)
        .then(empresa => {
          if (empresa) {
            this.atualizarEmpresaLogada(empresa);
            return Promise.resolve(true);
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          return Promise.reject();
        });
    } else {
      return Promise.reject();
    }
  }

  /** Atualiza a lista de empresas do controle.
   * @return Promise<boolean>...
   * */
  atualizarEmpresas(): Promise<boolean> {
    return this.empresaService.findAll()
      .then(empresas => {
        this.empresas = empresas;
        if (empresas.length === 1) {
          this.atualizarEmpresaLogada(empresas[0]);
          return Promise.resolve(true);
        }
        if (empresas.length > 0) {
          return Promise.resolve(true);
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        return Promise.reject();
      });
  }

  /** Atualiza a lista de empresas.
   * */
  atualizarListaEmpresas() {
    this.loadingService.dontShowLoadingOnThisTransaction();
    this.empresaService.findAll()
      .then(empresas => {
        this.empresas = empresas;
      })
      .catch(() => null);
  }

  /** Atualiza as empresas e valida a empresa logada, útil para quando houver alguma exclusão/atualização de empresas.
   * @return Promise<boolean>...
   * */
  atualizarServico(): Promise<boolean> {
    return this.atualizarEmpresas()
      .then(() => {
        return this.validarEmpresaLogada(true);
      })
      .catch(() => {
        return this.validarEmpresaLogada(true);
      });
  }

  /** Valida a empresa logada no localStorage.
   * @return Promise<boolean>...
   * */
  validarEmpresaLogada(injetaEmpresaPadraoIfLogadaNaoExistir?: boolean): Promise<boolean> {
    return this.empresaService.findById(Number(localStorage.getItem('empresaLogada')))
      .then(empresa => {
        if (empresa) {
          this.atualizarEmpresaLogada(empresa);
          return true;
        } else {
          if (injetaEmpresaPadraoIfLogadaNaoExistir) {
            return this.injetaEmpresaPadrao();
          } else {
            this.atualizarEmpresaLogada(null);
            return false;
          }
        }
      })
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.errorHandler.show(err);
            return false;
          }
        }
        if (injetaEmpresaPadraoIfLogadaNaoExistir) {
          return this.injetaEmpresaPadrao();
        } else {
          this.atualizarEmpresaLogada(null);
          return false;
        }
      });
  }

  /** Injeta a empresa padrão carregada pelo login na empresa logada.
   * @return Promise<boolean>...
   * */
  private injetaEmpresaPadrao(): Promise<boolean> {
    return this.empresaService.findById(Number(localStorage.getItem('cnxe')))
      .then(empresa => {
        if (empresa) {
          this.empresaPadraoIdentificada = true;
          this.atualizarEmpresaLogada(empresa);
          return true;
        } else {
          this.empresaPadraoIdentificada = false;
          this.atualizarEmpresaLogada(null);
          return false;
        }
      })
      .catch(() => {
        this.empresaPadraoIdentificada = false;
        this.atualizarEmpresaLogada(null);
        return false;
      });
  }

  /** Atualiza a empresa logada, apenas para controle interno do serviço.
   * @param empresa empresa a atualizar..
   * */
  private atualizarEmpresaLogada(empresa: Empresa) {
    if (empresa) {
      localStorage.setItem('empresaLogada', empresa.idempresa.toString());
      localStorage.setItem('ultimaEmpresaLogada', empresa.idempresa.toString());
    }
    this.empresaLogada = empresa;
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotAuthenticatedError } from '../auth/app-http';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export enum StackErrorEnum {
  MANIFESTO
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router,
              private toast: ToastrService) {
  }

  /**
   * Exibe um toast de erro na tela na tela.
   * @param err Mensagem a ser exibida, objetos mapeados: HttpErrorResponse
   * @param path Realiza a distinção de onde veio o erro, para saber quando mostrar as mensagens.
   * @severidade severidade da mensagem: values are "toasty", "info", "warn" and "error". */
  show(err: any, path?: StackErrorEnum) {
    console.error(err);
    let message: string;

    if (typeof err === 'string') {
      message = err;
    } else if (err instanceof NotAuthenticatedError) {
      message = 'A sua sessão expirou! Faça login novamente.';
      this.router.navigate(['/auth']);
    } else if (err instanceof HttpErrorResponse && err.status >= 400 && err.status <= 499) {
      message = 'Erro ao processar sua solicitação.';

      if (err.status === 403) {
        message = 'Você não tem permissão para executar essa ação.';
      }

      try {
        message = err.error[0].mensagemUsuario;
      } catch (e) {
        console.error('Ocorreu um erro!', err);
      }
    } else if (err instanceof HttpErrorResponse && err.status >= 500 && err.status <= 599) {
      message = 'Ocorreu algum erro no servidor que não pode ser identificado. Por favor entre em contato com o suporte técnico.';
    }

    if (err instanceof HttpErrorResponse) {

      // Trata se houve comunicação válida com o servidor.
      if (err.status === 0) {
        message = 'Estamos com problemas para se comunicar com o servidor! Tente novamente mais tarde...';
      }

    }


    this.toast.error(message, 'Ocorreu um erro inesperado. Por favor tente novamente ou contate o suporte técnico.');
  }


}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) {
  }

  success(msg: string) {
    this.toast.success(msg, 'Operação realizada com sucesso.');
  }

  warning(msg: string) {
    this.toast.warning(msg, 'Atenção, verifique!');
  }
}

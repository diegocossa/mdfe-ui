import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UsuarioService } from '../../../shared/services/usuario/usuario.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [SharedAnimations]
})
export class ForgotComponent implements OnInit {

  solicitacaoEnviada = false;

  constructor(private usuarioService: UsuarioService,
              private errorHandle: ErrorHandlerService,
              private fb: FormBuilder) {
  }

  emailForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required,
      Validators.email
    ])]
  });

  ngOnInit() {
  }

  resetaSenha() {

    this.usuarioService.resetaSenha(this.emailForm.get('email').value)
      .then(() => {
        this.solicitacaoEnviada = true;
      })
      .catch(erro => {
        this.solicitacaoEnviada = false;
        this.errorHandle.show(erro);
      });
  }
}

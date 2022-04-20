import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../shared/services/usuario/usuario.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ErrorHandlerService} from "../../../shared/services/util/error-handler.service";
import {ToastService} from "../../../shared/services/util/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-alterar-senha-usuario',
  templateUrl: './alterar-senha-usuario.component.html',
  styleUrls: ['./alterar-senha-usuario.component.scss']
})
export class AlterarSenhaUsuarioComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private title: Title,
              private usuarioService: UsuarioService,
              private errorHandler: ErrorHandlerService,
              private toast: ToastService,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.title.setTitle('3G Brasil - Usuário - Alterar Senha');
  }

  isSubmited = false;

  alterarSenhaForm = this.fb.group(
    {
      idUsuario: [null],
      senhaAtual: [null, Validators.compose([
        Validators.required
      ])],
      novaSenha: [null, Validators.compose([
        Validators.required
      ])],
      digiteNovamente: [null, Validators.compose([
        Validators.required
      ])]
    }
  );

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  alterar() {
    this.isSubmited = true;

    this.alterarSenhaForm.get('idUsuario').setValue(this.authService.jwtPayload.userId);

    if (this.alterarSenhaForm.get('novaSenha').value != this.alterarSenhaForm.get('digiteNovamente').value) {
      this.toast.warning('As senhas não estão iguais!');
      this.isSubmited = false;
      return;
    }

    this.usuarioService.alterarSenha(this.alterarSenhaForm.value)
      .then(() => {
        this.toast.success('Senha alterada com sucesso.');
        this.isSubmited = false;
        this.router.navigate(['']);
      })
      .catch(err => {
        this.errorHandler.show(err);
        this.isSubmited = false;
      });

  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ActivatedRoute, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { UsuarioService } from '../../../shared/services/usuario/usuario.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';

@Component({
  selector: 'app-recuperar-senha-usuario',
  templateUrl: './recuperar.senha.usuario.component.html',
  styleUrls: ['./recuperar.senha.usuario.component.scss']
})
export class RecuperarSenhaUsuarioComponent implements OnInit {

  loading: boolean;
  loadingText: string;
  recuperarSenhaForm: FormGroup;
  id: string;
  chk: string;
  typeBtn: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService) {

    this.typeBtn = 'submit';

  }

  ngOnInit() {
    this.id = this.routeActivate.snapshot.queryParamMap.get('id');
    this.chk = this.routeActivate.snapshot.queryParamMap.get('chk');

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.loadingText = 'Carregando menu principal...';

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.recuperarSenhaForm = this.fb.group({
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6),
        Validators.maxLength(20)])],
      senhaConfirmacao: ['', Validators.compose([Validators.required, Validators.minLength(6),
        Validators.maxLength(20), this.requiredSenhasIguais])],
      id: [''],
      chk: ['']
    });

    this.recuperarSenhaForm.get('id').setValue(this.id);
    this.recuperarSenhaForm.get('chk').setValue(this.chk);
  }

  confirmar() {
    this.loading = true;
    this.loadingText = 'Validando senha...';

    this.usuarioService.salvarSenha(this.recuperarSenhaForm.value)
      .then(res => {
        this.router.navigateByUrl('/#/session/signin');
        this.loading = false;
      }).catch(err => {
      this.errorHandler.show(err);
      this.loading = false;
    });
  }

  requiredSenhasIguais(control: AbstractControl) {
    if (!control) {
      return null;
    }
    if (!control.root) {
      return null;
    }
    if (!control.root.get('senha')) {
      return null;
    }
    if (!control.root.get('senhaConfirmacao')) {
      return null;
    }

    if ((control.root.get('senha').value !== control.root.get('senhaConfirmacao').value) && control.value !== '') {
      return {
        requiredSenhasIguais: true
      };
    }
  }
}

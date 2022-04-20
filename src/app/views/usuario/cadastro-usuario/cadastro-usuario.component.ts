import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ControleEmpresaLogadaService } from '../../../shared/services/auth/controles/controle-empresa-logada.service';
import { UsuarioService } from '../../../shared/services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private title: Title,
              private usuarioService: UsuarioService,
              private errorHandler: ErrorHandlerService,
              private toast: ToastService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.title.setTitle('3G Brasil - Usuário - Cadastro');
  }

  isSubmited = false;

  usuarioForm = this.fb.group(
    {
      idpessoa: [null],
      nome: [null, Validators.compose([
        Validators.required, Validators.maxLength(60)
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      cpf: [null, Validators.required],
      telefone: [null],
      fone: [null, Validators.required],
      flagativo: [null]
    }
  );

  get editing() {
    return Boolean(this.usuarioForm.get('idpessoa').value);
  }

  ngOnInit() {

    this.checarParametrosRota();

    if (!this.editing) {
      this.usuarioForm.get('flagativo').setValue(true);
    }
  }

  checarParametrosRota() {
    const idUsuario = this.activatedRoute.snapshot.params.id;
    if (idUsuario) {
      this.carregarUsuario(idUsuario);
    }
  }

  salvar() {
    this.isSubmited = true;
    if (this.editing) {
      this.usuarioService.update(this.usuarioForm.value)
        .then(() => {
          this.toast.success('Usuário editado com sucesso.');
          this.router.navigate(['/usuario']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    } else {
      this.usuarioService.save(this.usuarioForm.value)
        .then(() => {
          this.toast.success('Usuário cadastrado com sucesso.');
          this.router.navigate(['/usuario']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    }
  }

  carregarUsuario(idUsuario: number) {
    this.usuarioService.findById(idUsuario)
      .then(response => {
        this.usuarioForm.patchValue(response);
      }).catch(err => this.errorHandler.show(err));
  }
}

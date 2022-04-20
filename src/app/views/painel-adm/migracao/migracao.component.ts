import { Component, OnInit } from '@angular/core';
import {PainelAdmService} from "../../../shared/services/painel-adm/painel-adm.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ErrorHandlerService} from "../../../shared/services/util/error-handler.service";
import {ToastService} from "../../../shared/services/util/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-migracao',
  templateUrl: './migracao.component.html',
  styleUrls: ['./migracao.component.scss']
})
export class MigracaoComponent implements OnInit {

  constructor(private painelAdmService: PainelAdmService,
              private fb: FormBuilder,
              private errorHandler: ErrorHandlerService,
              private toast: ToastService,
              private router: Router) { }

  ngOnInit() {
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

  salvar() {
    this.isSubmited = true;
    this.painelAdmService.criarMigracao(this.usuarioForm.value)
      .then(() => {
        this.toast.success('Migração criada com sucesso, e-mail enviado para o novo usuário.');
        this.router.navigate(['/painel-adm/pesquisa-usuarios-public']);
        this.isSubmited = false;
      })
      .catch(error => {
        this.errorHandler.show(error);
        this.isSubmited = false;
      })
  }

}

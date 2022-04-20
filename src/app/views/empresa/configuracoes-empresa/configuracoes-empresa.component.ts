import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RegularExpression} from "../../../core/consts/regular-expression-sefaz";
import {EmpresaService} from "../../../shared/services/empresa/empresa.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorHandlerService} from "../../../shared/services/util/error-handler.service";
import {ToastService} from "../../../shared/services/util/toast.service";

@Component({
  selector: 'app-configuracoes-empresa',
  templateUrl: './configuracoes-empresa.component.html',
  styleUrls: ['./configuracoes-empresa.component.scss']
})
export class ConfiguracoesEmpresaComponent implements OnInit {

  configuracaoForm = this.fb.group({
    nmdf: [null, Validators.compose([
      Validators.required, Validators.pattern(RegularExpression.ER31)
    ])],
    serie: ['1', Validators.compose([
      Validators.required, Validators.pattern(RegularExpression.ER35)
    ])]
  });

  isSubmited = false;
  idEmpresa: number;

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private activatedRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private toastService: ToastService) { }

  ngOnInit() {
    this.idEmpresa = this.activatedRoute.snapshot.params.id;
    if (!this.idEmpresa) {
      this.errorHandler.show('Parece que houve algum problema com a rota de certificados, tente novamente.');
      this.router.navigate(['/empresa']);
    } else {
      this.carregarSequenciaAtual();
    }
  }

  carregarSequenciaAtual() {
    let serieMaquina = localStorage.getItem('serieEmpresa' + this.idEmpresa.toString());
    serieMaquina = serieMaquina ? serieMaquina : '1';
    this.empresaService.getContadorAtualNumeroManifesto(this.idEmpresa)
      .then(response => {
        this.configuracaoForm.setValue({
          nmdf: response,
          serie: serieMaquina
        })
      })
      .catch(error => {
        this.errorHandler.show(error);
      });
  }

  onSubmit() {
    this.isSubmited = true;

    this.atualizarSerieMaquina(this.configuracaoForm.value.serie);

    this.empresaService.atualizarContadorNumeroManifesto(this.idEmpresa, this.configuracaoForm.value.nmdf)
      .then(() => {
        this.toastService.success('Configurações salvas com sucesso.');
        this.isSubmited = false;
      })
      .catch(error => {
        this.errorHandler.show(error);
        this.isSubmited = false;
      });
  }

  atualizarSerieMaquina(serie: string) {
    localStorage.setItem('serieEmpresa' + this.idEmpresa.toString(), serie);
  }
}

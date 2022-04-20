import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SeguradoraService } from '../../../shared/services/seguradora/seguradora.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import {RegularExpression} from "../../../core/consts/regular-expression-sefaz";

@Component({
  selector: 'app-cadastro-seguradora',
  templateUrl: './cadastro-seguradora.component.html',
  styleUrls: ['./cadastro-seguradora.component.scss']
})
export class CadastroSeguradoraComponent implements OnInit {
  isSubmited = false;

  maxLength = {
    cpfcnpjresponsavel: 14,
    cnpjseguradora: 14
  };

  minLength = {
    cpfcnpjresponsavel: 11,
    cnpjseguradora: 14
  };

  tiposResponsavel = [
    {label: 'Contratante do Serviço de Emissão', value: 'CONTRATANTE_MDFE'},
    {label: 'Empresa Emissora', value: 'EMITENTE_MDFE'}
  ];

  seguradoraForm = this.fb.group({
    idSeguradora: [null],
    cpfcnpjresponsavel: [null, Validators.compose([
      this.requiredIfResponsavelContratante, Validators.maxLength(this.maxLength.cpfcnpjresponsavel),
      Validators.minLength(this.minLength.cpfcnpjresponsavel), Validators.pattern(RegularExpression.ER7)
    ])],
    nomeseguradora: [null, Validators.compose(
      [Validators.required, Validators.pattern(RegularExpression.ER35)]
    )],
    numeroapolice: [null, Validators.pattern(RegularExpression.ER35)],
    responsavel: ['EMITENTE_MDFE', Validators.required],
    cnpjseguradora: [null, Validators.compose([
      Validators.required, Validators.maxLength(this.maxLength.cnpjseguradora), Validators.minLength(this.minLength.cnpjseguradora),
      Validators.pattern(RegularExpression.ER9)
    ])]
  });

  requiredIfResponsavelContratante(control: FormControl) {
    if (!control) {
      return null;
    }
    if (!control.root) {
      return null;
    }
    if (!control.root.get('responsavel')) {
      return null;
    }
    if ((control.root.get('responsavel').value === 'CONTRATANTE_MDFE') && !control.value) {
      return {
        required: true
      };
    }
  }

  get editing() {
    return Boolean(this.seguradoraForm.get('idSeguradora').value);
  }

  constructor(private fb: FormBuilder,
              private title: Title,
              private seguradoraService: SeguradoraService,
              private router: Router,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) {
    this.title.setTitle('3G Brasil - Seguradora - Cadastro');
  }

  ngOnInit() {
    this.checarParametrosRota();
  }

  checarParametrosRota() {
    const idSeguradora = this.activatedRoute.snapshot.params.id;
    if (idSeguradora) {
      this.carregarSeguradora(idSeguradora);
    }
  }

  carregarSeguradora(idSeguradora: number) {
    this.seguradoraService.findById(idSeguradora)
      .then(response => {
        this.seguradoraForm.patchValue(response);
      }).catch(err => this.errorHandler.show(err));
  }

  atualizarValidacao() {
    this.seguradoraForm.get('cpfcnpjresponsavel').updateValueAndValidity();
  }

  onSubmit() {
    if (this.seguradoraForm.get('cpfcnpjresponsavel').value === '') {
      this.seguradoraForm.get('cpfcnpjresponsavel').setValue(null);
    }
    this.isSubmited = true;
    if (this.editing) {
      this.seguradoraService.update(this.seguradoraForm.value)
        .then(() => {
          this.toast.success('Seguradora editada com sucesso.');
          this.router.navigate(['/seguradora']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    } else {
      this.seguradoraService.save(this.seguradoraForm.value)
        .then(() => {
          this.toast.success('Seguradora cadastrada com sucesso.');
          this.router.navigate(['/seguradora']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    }
  }

}

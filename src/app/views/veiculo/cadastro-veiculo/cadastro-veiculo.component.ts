import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IBGEService, UF } from '../../../shared/services/util/ibge.service';
import { VeiculoService } from '../../../shared/services/veiculo/veiculo.service';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { Proprietario } from '../../../shared/models/veiculo/proprietario';
import {RegularExpression} from "../../../core/consts/regular-expression-sefaz";

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.scss']
})
export class CadastroVeiculoComponent implements OnInit {
  UFs: Array<UF>;

  isSubmited = false;

  maxLength = {
    placa: 7,
    renavam: 11
  };

  minLength = {
    placa: 7,
    renavam: 9
  };

  tiposVeiculo = [
    {label: 'Tração', value: 'TRACAO'},
    {label: 'Reboque', value: 'REBOQUE'}
  ];

  tiposRodado = [
    {label: 'Cavalo Mecânico', value: 'CAVALO_MECANICO'},
    {label: 'Toco', value: 'TOCO'},
    {label: 'Truck', value: 'TRUCK'},
    {label: 'Utilitário', value: 'UTILITARIO'},
    {label: 'Van', value: 'VAN'},
    {label: 'Outro', value: 'OUTROS'}
  ];

  tiposCarroceria = [
    {label: 'Sider', value: 'SIDER'},
    {label: 'Porta Contâiner', value: 'PORTA_CONTAINER'},
    {label: 'Aberta', value: 'ABERTA'},
    {label: 'Fechada Baú', value: 'FECHADA_BAU'},
    {label: 'Graneleira', value: 'GRANELEIRA'},
    {label: 'N/A', value: 'NAO_APLICAVEL'}
  ];

  tipoTerceiro = 'PF';

  tiposProprietario = [
    {label: 'TAC - Agregado', value: 'TAC_AGREGADO'},
    {label: 'TAC - Independente', value: 'TAC_INDEPENDENTE'},
    {label: 'Outros', value: 'OUTROS'}
  ];

  ufs = [];

  veiculoForm = this.fb.group({
    idveiculo: [null],
    placa: [null, Validators.compose([
      Validators.minLength(this.minLength.placa), Validators.maxLength(this.maxLength.placa), Validators.required,
      Validators.pattern(RegularExpression.ER40),
    ])],
    renavam: [null, Validators.compose([
      Validators.minLength(this.minLength.renavam), Validators.maxLength(this.maxLength.renavam), Validators.pattern(RegularExpression.ER35)
    ])],
    capacidadem3: [null, Validators.pattern(RegularExpression.ER32)],
    capacidadekg: [null, Validators.compose([
      Validators.required, Validators.pattern(RegularExpression.ER58)
    ])],
    uf: [null, Validators.required],
    tara: [null, Validators.compose([
      Validators.required, Validators.pattern(RegularExpression.ER58)
    ])],
    veiculotipo: ['TRACAO', Validators.required],
    tiporodado: [null, Validators.required],
    tipocarroceria: [null, Validators.required],
    tipopropriedade: ['PROPRIO', Validators.required],
    observacao: [null, Validators.maxLength(200)],
    proprietario: this.fb.group({
      idproprietario: [null],
      cpfcnpj: [null, Validators.compose([
        this.requiredIfTerceiro(this.tipoTerceiro)
      ])],
      rntrc: [null, Validators.compose([
        this.requiredIfTerceiro(this.tipoTerceiro), Validators.pattern(RegularExpression.ER41)
      ])],
      nome: [null, Validators.compose([
        this.requiredIfTerceiro(this.tipoTerceiro), Validators.pattern(RegularExpression.ER35)
      ])],
      ie: [null, Validators.compose([
        this.requiredIfTerceiro(this.tipoTerceiro), Validators.pattern(RegularExpression.ER29)
      ])],
      uf: [null, this.requiredIfTerceiro(this.tipoTerceiro)],
      tpProp: [null, this.requiredIfTerceiro(this.tipoTerceiro)]
    })
  });

  get editing() {
    return Boolean(this.veiculoForm.get('idveiculo').value);
  }

  constructor(private fb: FormBuilder,
              private title: Title,
              private veiculoService: VeiculoService,
              private ibgeService: IBGEService,
              private router: Router,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) {
    this.title.setTitle('3G Brasil - Veiculo - Cadastro');
  }

  ngOnInit() {
    this.loadUfs();
    this.checarParametrosRota();
  }

  loadUfs() {
    this.ibgeService.getUFs()
      .then(response => {
        this.ufs = response;
      })
      .catch(() => null);
  }

  requiredIfTerceiro(tipoTerceiro: string): ValidatorFn {
    return (control: FormControl) => {
      if (!control) {
        return null;
      }
      if (!control.root) {
        return null;
      }
      if (control.root.get('tipopropriedade')) {
        if ((control.root.get('tipopropriedade').value === 'TERCEIRO')) {
          if (!control.value) {
            return {
              required: true
            };
          }
        }
      }
      return null;
    };
  }

  checarParametrosRota() {
    const idveiculo = this.activatedRoute.snapshot.params.id;
    if (idveiculo) {
      this.carregarVeiculo(idveiculo);
    }
  }

  carregarVeiculo(idveiculo: number) {
    this.veiculoService.findById(idveiculo)
      .then(response => {
        if (response.proprietario === null) {
          response.proprietario = new Proprietario();
        }
        if (response.proprietario.cpfcnpj && response.proprietario.cpfcnpj.length > 11) {
          this.tipoTerceiro = 'PJ';
        } else {
          this.tipoTerceiro = 'PF';
        }
        this.veiculoForm.patchValue(response);
      }).catch(err => this.errorHandler.show(err));
  }

  atualizarValidadoresProprietario() {
    this.veiculoForm.get('proprietario').get('cpfcnpj').clearValidators();
    this.veiculoForm.get('proprietario').get('cpfcnpj').setValidators(this.requiredIfTerceiro(this.tipoTerceiro));

    this.veiculoForm.get('proprietario').get('rntrc').clearValidators();
    this.veiculoForm.get('proprietario').get('rntrc').setValidators(this.requiredIfTerceiro(this.tipoTerceiro));

    this.veiculoForm.get('proprietario').get('nome').clearValidators();
    this.veiculoForm.get('proprietario').get('nome').setValidators(this.requiredIfTerceiro(this.tipoTerceiro));

    this.veiculoForm.get('proprietario').get('ie').clearValidators();
    this.veiculoForm.get('proprietario').get('ie').setValidators(this.requiredIfTerceiro(this.tipoTerceiro));

    this.veiculoForm.get('proprietario').get('uf').clearValidators();
    this.veiculoForm.get('proprietario').get('uf').setValidators(this.requiredIfTerceiro(this.tipoTerceiro));

    this.veiculoForm.get('proprietario').get('tpProp').clearValidators();
    this.veiculoForm.get('proprietario').get('tpProp').setValidators(this.requiredIfTerceiro(this.tipoTerceiro));
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.editing) {
      this.veiculoService.update(this.veiculoForm.value)
        .then(() => {
          this.toast.success('Veículo editado com sucesso.');
          this.router.navigate(['/veiculo']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    } else {
      this.veiculoService.save(this.veiculoForm.value)
        .then(() => {
          this.toast.success('Veículo cadastrado com sucesso.');
          this.router.navigate(['/veiculo']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    }
  }
}

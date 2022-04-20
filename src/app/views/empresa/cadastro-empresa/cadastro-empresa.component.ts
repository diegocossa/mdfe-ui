import {Component, OnInit} from '@angular/core';
import {IBGEService, Municipio, UF} from '../../../shared/services/util/ibge.service';
import {EmpresaService} from '../../../shared/services/empresa/empresa.service';
import {ErrorHandlerService} from '../../../shared/services/util/error-handler.service';
import {ToastService} from '../../../shared/services/util/toast.service';
import {ControleEmpresaLogadaService} from '../../../shared/services/auth/controles/controle-empresa-logada.service';
import {LoadingService} from '../../../shared/services/util/loading.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {RegularExpression} from "../../../core/consts/regular-expression-sefaz";

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.scss']
})
export class CadastroEmpresaComponent implements OnInit {

  isSubmited = false;

  ambientes = [
    {label: 'Homologação', value: 'HOMOLOGACAO'},
    {label: 'Produção', value: 'PRODUCAO'}
  ];

  tiposEmissao = [
    {label: 'Normal', value: 'NORMAL'},
    {label: 'Contingência', value: 'CONTINGENCIA'}
  ]

  tiposEmitente = [
    {label: 'Prestador de Serviço', value: 'PRESTADOR_SERVICO'},
    {label: 'Carga Própria', value: 'CARGA_PROPRIA'}
  ];

  tiposTransportador = [
    {label: 'ETC', value: 'ETC'},
    {label: 'TAC', value: 'TAC'},
    {label: 'CTC', value: 'CTC'}
  ];

  paises = [
    {label: 'Brasil', value: 'Brasil'}
  ];

  ufs = [];
  municipios = [];

  maxLength = {
    cnpj: 14,
    rntrc: 8
  };
  minLength = {
    cnpj: 14
  };

  empresaForm = this.fb.group({
    idempresa: [null],
    cnpj: [null, Validators.compose([
      Validators.required, Validators.minLength(this.minLength.cnpj), Validators.maxLength(this.maxLength.cnpj),
      Validators.pattern(RegularExpression.ER7)
    ])],
    inscricaoestadual: [null, Validators.compose(
      [Validators.required, Validators.pattern(RegularExpression.ER30), Validators.maxLength(14)]
    )],
    razaosocial: [null, Validators.compose(
      [Validators.required, Validators.pattern(RegularExpression.ER35)]
    )],
    fantasia: [null, Validators.compose(
      [Validators.required, Validators.pattern(RegularExpression.ER35)]
    )],
    email: [null, Validators.compose([
      Validators.required, Validators.email, Validators.pattern(RegularExpression.ER55)
    ])],
    tipoambiente: ['HOMOLOGACAO', Validators.required],
    tpemis: ['NORMAL', Validators.required],
    rntrc: [null, Validators.compose(
      [Validators.maxLength(8), Validators.pattern(RegularExpression.ER41)]
    )],
    tipoemitente: [null, Validators.required],
    tpTransp: [null, Validators.required],
    pais: ['Brasil', Validators.required],
    uf: [null, Validators.required],
    logradouro: [null, Validators.compose(
      [Validators.required, Validators.pattern(RegularExpression.ER35)]
    )],
    complemento: [null, Validators.pattern(RegularExpression.ER35)],
    cep: [null, Validators.pattern(RegularExpression.ER41)],
    municipio: [null, Validators.required],
    codigomunicipio: [null],
    numero: [null, Validators.compose([
      Validators.required, Validators.pattern(RegularExpression.ER35)
    ])],
    bairro: [null, Validators.compose([
      Validators.required, Validators.pattern(RegularExpression.ER35)
    ])],
    fone: [null, Validators.pattern(RegularExpression.ER48)],
    observacao: [null],
    flagcanalverde: [false]
  });

  get editing() {
    return Boolean(this.empresaForm.get('idempresa').value);
  }

  constructor(private fb: FormBuilder,
              private title: Title,
              private ibgeService: IBGEService,
              private empresaService: EmpresaService,
              private errorHandler: ErrorHandlerService,
              private toast: ToastService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private controleEmpresaLogadaService: ControleEmpresaLogadaService,
              private loadingService: LoadingService) {
    this.title.setTitle('3G Brasil - Empresa - Cadastro');
  }

  ngOnInit() {
    this.loadingService.showForSeconds(1);
    this.loadUfs();
    this.checarParametrosRota();
  }

  checarParametrosRota() {
    const idempresa = this.activatedRoute.snapshot.params.id;
    if (idempresa) {
      this.carregarEmpresa(idempresa);
    }
  }

  carregarEmpresa(idempresa: number) {
    this.empresaService.findById(idempresa)
      .then(response => {
        this.empresaForm.patchValue(response);
        this.loadUfs();
      }).catch(err => this.errorHandler.show(err));
  }

  loadUfs() {
    this.ibgeService.getUFs()
      .then(response => {
        this.ufs = response;

        if (this.empresaForm.get('uf').value) {
          this.loadMunicipios(
            this.ufs.filter(x => x.sigla === this.empresaForm.get('uf').value)[0], true
          );
        }
      })
      .catch(() => null);
  }

  loadIdMunicipio(municipio: Municipio) {
    this.empresaForm.get('codigomunicipio').setValue(municipio.id);
  }

  loadMunicipios(uf: UF, loadUfCall = false) {
    this.municipios = [];
    if (!loadUfCall) {
      this.empresaForm.get('municipio').reset();
    }
    if (uf) {
      this.ibgeService.getMunicipios(uf.id)
        .then(response => {
          this.municipios = response;
        }).catch(() => null);
    }
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.editing) {
      this.empresaService.update(this.empresaForm.value)
        .then(() => {
          this.toast.success('Empresa editada com sucesso.');
          this.router.navigate(['/empresa']);

          this.controleEmpresaLogadaService.atualizarServico();
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    } else {
      this.empresaService.save(this.empresaForm.value)
        .then(() => {
          this.toast.success('Empresa cadastrada com sucesso.');
          this.router.navigate(['/empresa']);

          this.controleEmpresaLogadaService.atualizarServico();
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    }
  }

}

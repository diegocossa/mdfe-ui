import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MdfeService } from '../../../shared/services/mdfe/mdfe.service';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService, StackErrorEnum } from '../../../shared/services/util/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MDFeUtils } from './mdfe-utils';
import {RegularExpression} from "../../../core/consts/regular-expression-sefaz";
import { IBGEService, UF } from "../../../shared/services/util/ibge.service";
import {ControleEmpresaLogadaService} from "../../../shared/services/auth/controles/controle-empresa-logada.service";
import * as moment from 'moment';

@Component({
  selector: 'app-cadastro-mdfe',
  templateUrl: './cadastro-mdfe.component.html',
  styleUrls: ['./cadastro-mdfe.component.scss']
})
export class CadastroMdfeComponent implements OnInit {

  isSubmited = false;

  mdfeForm: FormGroup;

  mdfeUtils = new MDFeUtils();

  UFs: Array<UF>;

  get editing() {
    return Boolean(this.mdfeForm.get('idmdfe').value);
  }

  @ViewChild('operacaoMdfeComponent') operacaoMdfeComponent;

  constructor(private fb: FormBuilder,
              private title: Title,
              private mdfeService: MdfeService,
              private toastService: ToastService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private ibgeService: IBGEService,
              private controleEmpresaLogadaService: ControleEmpresaLogadaService) {
    this.title.setTitle('3G Brasil - Manifesto - Cadastro');
  }


  ngOnInit() {
    this.carregarUFs();
    this.criarFormulario();
    this.buscarSerieConfiguradaMaquina();
  }

  buscarSerieConfiguradaMaquina() {
    let serieMaquina = localStorage.getItem('serieEmpresa' + this.controleEmpresaLogadaService.empresaLogada.idempresa.toString());
    serieMaquina = serieMaquina ? serieMaquina : '1';
    this.mdfeForm.get('serie').setValue(serieMaquina);
  }

  carregarUFs() {
    this.ibgeService.getUFs()
      .then(response => {
        this.UFs = response;
        this.checarParametrosRota();
      })
      .catch(err => {
        this.errorHandler.show(err, StackErrorEnum.MANIFESTO);
      });
  }

  criarFormulario() {
    this.mdfeForm = this.fb.group({
      idmdfe: [null],

      idlote: [null],
      chave: [null],
      numrecibo: [null],
      numprotocolo: [null],
      ambienteenvio: [null],
      statusenvio: [null],
      statusmdfe: [null],
      motivoenvio: [null],
      ambienterecibo: [null],
      statusrecibo: [null],
      motivorecibo: [null],
      retornorecibo: [null],
      indcarregaposterior: [null],
      serie: [1, Validators.compose([
          Validators.required, Validators.pattern(RegularExpression.ER35)
      ])],
      nmdf: [null, Validators.compose([
          Validators.pattern(RegularExpression.ER31)
      ])],
      cmdf: [null],
      cdv: [null],

      dhemi: [moment().format()], // BACK-END
      dhiniviagem: [moment().format()], // BACK-END

      ufini: [null, Validators.required], // OK
      uffim: [null, Validators.required], // OK

      infadfisco: [null, Validators.pattern(RegularExpression.ER35)], // OK
      infcpl: [null, Validators.pattern(RegularExpression.ER35)], // OK

      veiculotracao: [null, Validators.required], // OK
      situacao: [null], // BACK-END

      infmuncarregalist: [null, Validators.compose([
        Validators.required, Validators.maxLength(50)
      ])], // OK
      infpercursolist: [null, Validators.maxLength(25)], // OK
      infmundescargalist: this.fb.array([], Validators.compose([
        Validators.required, Validators.maxLength(4000)
      ])), // OK

      seglist: this.fb.array([]), // OK.

      totalizadores: [null], // BACK-END

      lacrelist: [null, Validators.pattern(RegularExpression.ER35)], // OK
      autorizadosxmllist: this.fb.array([]), // OK.
      infciotlist: this.fb.array([]), // OK.
      valepedagiolist: this.fb.array([]), // OK.
      infcontratantelist: this.fb.array([]), // OK.
      condutorlist: [null, Validators.compose([
        Validators.required, Validators.maxLength(3)
      ])], // OK
      lacrerodoviariolist: [null, Validators.pattern(RegularExpression.ER35)], // OK
      veiculoreboquelist: [null, Validators.maxLength(3)], // OK
    });
  }

  checarParametrosRota() {
    const idmdfe = this.activatedRoute.snapshot.params.id;
    if (idmdfe) {
      this.carregarManifesto(idmdfe);
    }
  }

  carregarManifesto(idmdfe: number) {
    this.mdfeService.findById(idmdfe)
      .then(response => {
        response.infpercursolist.forEach(x => {
          x.nome = this.mdfeUtils.getUFBySigla(x.ufper);
        });

        const ufCarregamento = this.UFs.filter(x => x.sigla === response.ufini)[0];
        const ufDescarregamento = this.UFs.filter(x => x.sigla === response.uffim)[0];
        this.operacaoMdfeComponent.carregarMunicipiosCarregamento({id: ufCarregamento.id});
        this.operacaoMdfeComponent.carregarMunicipiosDescarregamento({id: ufDescarregamento.id});

        this.mdfeForm.patchValue(response);

        this.patchValueAutorizadosXmlList(response);
        this.patchValueCiotList(response);
        this.patchValueValePedagioList(response);
        this.patchValueInformacoesContratanteList(response);
        this.patchValueSegList(response);
        this.patchValueMunicipioDescargaList(response);
      })
      .catch(error => {
        this.errorHandler.show('Erro ao carregar o manifesto, por favor, retorne a pesquisa e tente novamente.');
      });
  }

  private patchValueAutorizadosXmlList(response) {
    const formArray = this.mdfeForm.get('autorizadosxmllist') as FormArray;
    response.autorizadosxmllist.forEach(x => {
      const formGroup = this.mdfeUtils.getAutorizadosXMLForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);
    });
  }

  private patchValueCiotList(response) {
    const formArray = this.mdfeForm.get('infciotlist') as FormArray;
    response.infciotlist.forEach(x => {
      const formGroup = this.mdfeUtils.getCiotForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);
    });
  }

  private patchValueValePedagioList(response) {
    const formArray = this.mdfeForm.get('valepedagiolist') as FormArray;
    response.valepedagiolist.forEach(x => {
      const formGroup = this.mdfeUtils.getValePedagioForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);
    });
  }

  private patchValueInformacoesContratanteList(response) {
    const formArray = this.mdfeForm.get('infcontratantelist') as FormArray;
    response.infcontratantelist.forEach(x => {
      const formGroup = this.mdfeUtils.getInformacoesContratanteForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);
    });
  }

  private patchValueSegList(response) {
    const formArray = this.mdfeForm.get('seglist') as FormArray;
    response.seglist.forEach(x => {
      const formGroup = this.mdfeUtils.getSeguradoraForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);
    });
  }

  private patchValueMunicipioDescargaList(response) {
    const formArray = this.mdfeForm.get('infmundescargalist') as FormArray;
    response.infmundescargalist.forEach(x => {
      const formGroup = this.mdfeUtils.getMunicipioDescargaForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);

      this.patchValueDocumentoList(formGroup, x);
    });
  }

  private patchValueDocumentoList(formGroupMunicipioDescarga, informacaoDescarga) {
    const formArray = formGroupMunicipioDescarga.get('infdoclist') as FormArray;
    informacaoDescarga.infdoclist.forEach(x => {
      const formGroup = this.mdfeUtils.getDocumentoForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);

      this.patchValueUnidadeTransporteList(formGroup, x);
      this.patchValuePericulosidade(formGroup, x);
    });
  }

  private patchValueUnidadeTransporteList(formGroupDocumento, unidadeTransporte) {
    const formArray = formGroupDocumento.get('infunidtransplist') as FormArray;
    unidadeTransporte.infunidtransplist.forEach(x => {
      const formGroup = this.mdfeUtils.getUnidadeTransporteForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);

      this.patchValueUnidadeCargaList(formGroup, x);
    });
  }

  private patchValuePericulosidade(formGroupUnidadeTransporte, unidadeCarga) {
    const formArray = formGroupUnidadeTransporte.get('periculosidadelist') as FormArray;
    unidadeCarga.periculosidadelist.forEach(x => {
      const formGroup = this.mdfeUtils.getPericulosidadeForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);
    });
  }

  private patchValueUnidadeCargaList(formGroupUnidadeTransporte, unidadeCarga) {
    const formArray = formGroupUnidadeTransporte.get('infunidcargalist') as FormArray;
    unidadeCarga.infunidcargalist.forEach(x => {
      const formGroup = this.mdfeUtils.getUnidadeCargaForm();
      formGroup.patchValue(x);
      formArray.push(formGroup);
    });
  }


  filtroSalvar() {

    this.mdfeForm.get('dhemi').setValue(moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
    this.mdfeForm.get('dhiniviagem').setValue(moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));

    if (this.mdfeForm.get('idmdfe').value) {
      this.atualizarManifesto();
    } else {
      this.salvarManifesto();
    }
  }

  salvarManifesto() {
    this.mdfeService.save(this.mdfeForm.value)
      .then(response => {
        this.toastService.success('Manifesto gravado com sucesso.');
        this.router.navigate(['/painel']);
      })
      .catch(error => {
        this.errorHandler.show(error);
      });
  }

  atualizarManifesto() {
    this.mdfeService.update(this.mdfeForm.value)
      .then(response => {
        this.toastService.success('Manifesto salvo com sucesso.');
        this.router.navigate(['/painel']);
      })
      .catch(error => {
        this.errorHandler.show(error);
      });
  }

  onSubmit() {
    this.isSubmited = true;
  }

}

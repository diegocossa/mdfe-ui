import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MDFeFilter, MdfeService} from '../../../shared/services/mdfe/mdfe.service';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../../shared/services/util/toast.service';
import {CNPJPipe} from '../../../shared/pipes/cnpj-pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../shared/services/util/error-handler.service';
import {ControleEmpresaLogadaService} from '../../../shared/services/auth/controles/controle-empresa-logada.service';
import {LoadingService} from '../../../shared/services/util/loading.service';
import {Action, ActionColor, Column} from '../../../shared/components/table/table.component';
import {IBGEService} from "../../../shared/services/util/ibge.service";
import {EncerrarManifestoComponent} from "../../mdfe/eventos/encerrar-manifesto/encerrar-manifesto.component";
import {CancelarManifestoComponent} from "../../mdfe/eventos/cancelar-manifesto/cancelar-manifesto.component";
import {InserirMotoristaComponent} from "../../mdfe/eventos/inserir-motorista/inserir-motorista.component";
import {ModalRejeicaoComponent} from "../../mdfe/utils/modal-rejeicao/modal-rejeicao.component";
import {ModalConsultaNaoEncerradosComponent} from "../../mdfe/utils/modal-consulta-nao-encerrados/modal-consulta-nao-encerrados.component";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit, AfterViewInit {
  constructor(private title: Title,
              private mdfeService: MdfeService,
              private auth: AuthService,
              private modalService: NgbModal,
              private toast: ToastService,
              private cnpjPipe: CNPJPipe,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private controleEmpresaLogadaService: ControleEmpresaLogadaService,
              private loadingService: LoadingService,
              private activatedRoute: ActivatedRoute,
              private ibgeService: IBGEService) {
    this.title.setTitle('3G Brasil - Painel Principal');
  }

  paginatorLength = 20;
  pageSize = 20;
  paginaAtual = 0;

  GRAVADO = 0;
  PROCESSAMENTO = 0;
  REJEITADO = 0;
  AUTORIZADO = 0;
  CANCELADO = 0;
  ENCERRADO = 0;

  filter = new MDFeFilter();
  mdfes = [];

  ufs = [];

  mostrarFiltrosPesquisa = false;

  cols: Column[] = [
    {field: 'veiculo', header: 'Veículo', width: 50},
    {field: 'nmdf', header: 'N° Manifesto', width: 35},
    {field: 'serie', header: 'Série', width: 35},
    {field: 'chave', header: 'Chave', width: 44}
  ];
  actions: Action[] = [
    {
      key: 1,
      icon: 'i-Edit',
      color: ActionColor.INFO,
      tooltip: 'Editar',
      disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_MDFE')
    },
    {
      key: 2,
      icon: 'i-Share-on-Cloud',
      color: ActionColor.SUCCESS,
      tooltip: 'Emitir',
      disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_MDFE')
    }
  ];

  actionPerformed(event) {
    switch (event.key) {
      case 1: // Edição
        this.eventoEditar(event.data);
        break;
      case 2: // Emissão
        this.eventoEmitir(event.data);
        break;
      case 3: // Consulta
        this.eventoConsultar(event.data);
        break;
      case 4: // Encerrar
        this.eventoEncerrar(event.data);
        break;
      case 5: // Cancelar
        this.eventoCancelar(event.data);
        break;
      case 6: // Incluir Condutor
        this.eventoIncluirCondutor(event.data);
        break;
      case 7: // Imprimir Manifesto
        this.eventoImprimir(event.data);
        break;
      case 8: // Download XML
        this.eventoDownloadXML(event.data);
        break;

      case 101:
        this.mostrarRejeicao(event.data);
        break;
    }
  }

  consultarNaoEncerrados() {
    this.mdfeService.consultarNaoEncerrados(this.controleEmpresaLogadaService.empresaLogada.cnpj)
      .then(response => {
        const dialogReference = this.modalService.open(ModalConsultaNaoEncerradosComponent,
          {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});
        dialogReference.componentInstance.data = {
          listMdfeNaoEncerrados: response
        };
        dialogReference.result
          .then(() => {
            this.pesquisar();
            this.atualizarTotalizadores();
            this.ajustarAcoes();
          })
          .catch(() => {
            this.pesquisar();
            this.atualizarTotalizadores();
            this.ajustarAcoes();
          });
      })
      .catch(error => {
        this.errorHandler.show(error);
      });
  }

  mostrarRejeicao(data) {
    const dialogReference = this.modalService.open(ModalRejeicaoComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});
    dialogReference.componentInstance.data = {
      mdfe: data
    };
  }

  eventoImprimir(data) {
    this.mdfeService.imprimirMDFe(data.idmdfe)
      .then(response => {
        const url = window.URL.createObjectURL(response);
        window.open(url);
      })
      .catch(error => {
        this.errorHandler.show(error);
      });
  }

  eventoDownloadXML(data) {
    this.mdfeService.downloadXML(data.idmdfe)
        .then(response => {
            const blob = new Blob([response], { type: 'application/xml' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.download = data.chave + '.xml';
            anchor.href = url;
            anchor.click();
        })
        .catch(error => {
          this.errorHandler.show(error);
        });
  }

  eventoCancelar(data) {
    const dialogReference = this.modalService.open(CancelarManifestoComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.result
      .then((result) => {
        this.mdfeService.cancelar(data.idmdfe, result.motivo)
          .then(response => {
            this.filter.situacao = response.situacao;
            if (response.situacao === 'CANCELADO') {
              this.toast.success('Manifesto cancelado com sucesso.');
            }
            this.pesquisar();
            this.atualizarTotalizadores();
            this.ajustarAcoes();
          })
          .catch(error => {
            this.errorHandler.show(error);
          })
      }).catch((reject) => {

    });
  }

  eventoIncluirCondutor(data) {
    const dialogReference = this.modalService.open(InserirMotoristaComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.result
      .then((result) => {
        this.mdfeService.incluirCondutor(data.idmdfe, result.motorista)
          .then(response => {
            this.filter.situacao = response.situacao;

            if (response.statusmdfe === '135') {
              this.toast.success('Motorista incluso com sucesso.');
            } else {
              this.toast.warning('O evento não foi registrado com sucesso!');
            }
            this.pesquisar();
            this.atualizarTotalizadores();
            this.ajustarAcoes();
          })
          .catch(error => {
            this.errorHandler.show(error);
          })
      }).catch((reject) => {

    });
  }

  eventoEncerrar(data) {
    const dialogReference = this.modalService.open(EncerrarManifestoComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.result
      .then((result) => {
        this.mdfeService.encerrar(data.idmdfe, result.formEncerramento).then(response => {
          this.filter.situacao = response.situacao;
          if (response.situacao === 'ENCERRADO') {
            this.toast.success('Manifesto encerrado com sucesso.');
          }
          this.pesquisar();
          this.atualizarTotalizadores();
          this.ajustarAcoes();
        })
          .catch(error => {
            this.errorHandler.show(error);
          })
      }).catch((reject) => {

    });
  }

  eventoConsultar(data) {
    this.mdfeService.consultar(data.idmdfe)
      .then(response => {
        this.filter.situacao = response.situacao;

        switch (response.situacao) {
          case 'AUTORIZADO':
            this.toast.success('Este manifesto está autorizado!');
            break;
          case 'REJEITADO':
            this.errorHandler.show('Manifesto rejeitado pela SEFAZ! Confira a rejeição nos detalhes do manifesto.');
            break;
          case 'CANCELADO':
            this.toast.success('Este manifesto está cancelado!');
            break;
          case 'ENCERRADO':
            this.toast.success('Este manifesto está encerrado!');
            break;
          case 'PROCESSAMENTO':
            this.toast.warning('Este manifesto ainda está em processamente, tente novamente em alguns minutos.');
            break;
        }

        this.pesquisar();
        this.atualizarTotalizadores();
        this.ajustarAcoes();
      })
      .catch(error => {
        this.errorHandler.show(error);
      });
  }

  eventoEditar(data) {
    this.router.navigate(['/mdfe', data.idmdfe]);
  }

  eventoEmitir(data) {
    this.mdfeService.emitir(data.idmdfe)
      .then(response => {
        this.filter.situacao = response.situacao;
        this.pesquisar();
        this.atualizarTotalizadores();
        this.ajustarAcoes();
      }).catch(error => {
        this.mdfeService.findById(data.idmdfe)
          .then(response => {
            this.filter.situacao = response.situacao;
            this.pesquisar();
            this.atualizarTotalizadores();
            this.ajustarAcoes();
          }).catch(error => {
          this.errorHandler.show(error);
        });
      this.errorHandler.show(error);
    });
  }

  onPageChange(event) {
    this.paginaAtual = event.pageIndex;
    this.pesquisar(event.offset);
  }

  pesquisar(page = 0) {
    this.filter.page = page;
    this.filter.size = 20;
    this.mdfes = [];
    this.mdfeService.filter(this.filter)
      .then(response => {
        const mdfelist = [];
        for (const mdfe of response.mdfes) {
          mdfelist.push({
            idmdfe: mdfe.idmdfe,
            situacao: mdfe.situacao,
            chave: mdfe.chave,
            veiculo: mdfe.veiculotracao.placa,
            nmdf: mdfe.nmdf ? mdfe.nmdf : 'N/A',
            serie: mdfe.serie ? mdfe.serie : 'N/A',
            retornorecibo: mdfe.retornorecibo ? mdfe.retornorecibo : 'N/A'
          });
        }
        this.mdfes = mdfelist;
        this.paginatorLength = response.total;
      })
      .catch(() => null);
  }

  ngOnInit() {
    this.loadingService.show();

    this.activatedRoute.params.subscribe(value => {
      this.atualizarTotalizadores();
      this.pesquisar();
    });

    this.loadUfs();

    this.ajustarAcoes();
  }

  ajustarAcoes() {
    switch (this.filter.situacao) {
      case 'GRAVADO':
        this.actions = [
          {key: 1, icon: 'i-Edit', color: ActionColor.INFO, tooltip: 'Editar', disabled: false},
          {key: 2, icon: 'i-Share-on-Cloud', color: ActionColor.SUCCESS, tooltip: 'Emitir', disabled: false}
        ];
        break;
      case 'PROCESSAMENTO':
        this.actions = [
          {key: 3, icon: 'i-File-Search', color: ActionColor.LIGHT, tooltip: 'Consultar', disabled: false}
        ];
        break;
      case 'REJEITADO':
        this.actions = [
          {key: 1, icon: 'i-Edit', color: ActionColor.INFO, tooltip: 'Editar', disabled: false},
          {key: 2, icon: 'i-Share-on-Cloud', color: ActionColor.SUCCESS, tooltip: 'Emitir', disabled: false}
        ];
        break;
      case 'AUTORIZADO':
        this.actions = [
          {key: 4, icon: 'i-Endways', color: ActionColor.SUCCESS, tooltip: 'Encerrar', disabled: false},
          {key: 5, icon: 'i-Close', color: ActionColor.DANGER, tooltip: 'Cancelar', disabled: false},
          {key: 6, icon: 'i-Add', color: ActionColor.INFO, tooltip: 'Incluír Condutor', disabled: false},
          {key: 7, icon: 'i-Receipt', color: ActionColor.DARK, tooltip: 'Imprimir', disabled: false},
          {key: 8, icon: 'i-Download', color: ActionColor.LIGHT, tooltip: 'Baixar XML', disabled: false}
        ];
        break;
      case 'CANCELADO':
        this.actions = [
          {key: 7, icon: 'i-Receipt', color: ActionColor.DARK, tooltip: 'Imprimir', disabled: false}
        ];
        break;
      case 'ENCERRADO':
        this.actions = [
          {key: 7, icon: 'i-Receipt', color: ActionColor.DARK, tooltip: 'Imprimir', disabled: false},
          {key: 8, icon: 'i-Download', color: ActionColor.LIGHT, tooltip: 'Baixar XML', disabled: false}
        ];
        break;
    }

    this.ajustarColunas();
  }

  setFiltroSituacaoPesquisa(situacao: string) {
    this.filter.situacao = situacao;
    this.pesquisar(0);
    this.ajustarAcoes();
    this.atualizarTotalizadores();
  }

  ajustarColunas() {
    switch (this.filter.situacao) {
      case 'REJEITADO':
        this.cols = Columns.ColumnsRejeicao;
        break;
      default:
        this.cols = Columns.ColumnsDefault;
    }
  }

  atualizarTotalizadores() {
    this.mdfeService.buscarTotalizadores()
      .then(response => {
        this.GRAVADO = 0;
        this.PROCESSAMENTO = 0;
        this.REJEITADO = 0;
        this.AUTORIZADO = 0;
        this.CANCELADO = 0;
        this.ENCERRADO = 0;
        response.forEach(x => {
          switch (x.situacaomdfe) {
            case 'GRAVADO':
              this.GRAVADO = x.total;
              break;
            case 'PROCESSAMENTO':
              this.PROCESSAMENTO = x.total;
              break;
            case 'REJEITADO':
              this.REJEITADO = x.total;
              break;
            case 'AUTORIZADO':
              this.AUTORIZADO = x.total;
              break;
            case 'CANCELADO':
              this.CANCELADO = x.total;
              break;
            case 'ENCERRADO':
              this.ENCERRADO = x.total;
              break;
          }
        });
      })
      .catch(error => {
      });
  }

  ngAfterViewInit() {
    this.loadingService.dismiss();
  }

  loadUfs() {
    this.ibgeService.getUFs()
      .then(response => {
        this.ufs = response;
      })
      .catch(() => null);
  }

}

const Columns = {
  ColumnsDefault: [
    {field: 'veiculo', header: 'Veículo', width: 50},
    {field: 'nmdf', header: 'N° Manifesto', width: 35},
    {field: 'serie', header: 'Série', width: 35}
  ],
  ColumnsRejeicao: [
    {field: 'veiculo', header: 'Veículo', width: 50},
    {field: 'nmdf', header: 'N° Manifesto', width: 35},
    {field: 'serie', header: 'Série', width: 35},
    {
      field: 'retornorecibo',
      header: 'Rejeição',
      buttonEvent: true,
      width: 50,
      actionButton: {
        key: 101,
        icon: 'i-Danger',
        text: 'Rejeição',
        color: ActionColor.DANGER,
        tooltip: 'Mostrar Rejeição',
        disabled: false
      },
    }
  ]
};

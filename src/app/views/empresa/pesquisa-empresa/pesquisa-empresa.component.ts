import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Action, ActionColor, Column } from '../../../shared/components/table/table.component';
import { EmpresaFilter, EmpresaService } from '../../../shared/services/empresa/empresa.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { ControleEmpresaLogadaService } from '../../../shared/services/auth/controles/controle-empresa-logada.service';
import { LoadingService } from '../../../shared/services/util/loading.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CNPJPipe } from '../../../shared/pipes/cnpj-pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoveConfirmModalComponent } from '../../../shared/components/util/remove-confirm-modal/remove-confirm-modal.component';
import { TelefonePipe } from '../../../shared/pipes/telefone-pipe';

@Component({
  selector: 'app-pesquisa-empresa',
  templateUrl: './pesquisa-empresa.component.html',
  styleUrls: ['./pesquisa-empresa.component.scss']
})
export class PesquisaEmpresaComponent implements OnInit, AfterViewInit {
  constructor(private title: Title,
              private empresaService: EmpresaService,
              public auth: AuthService,
              private modalService: NgbModal,
              private toast: ToastService,
              private cnpjPipe: CNPJPipe,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private controleEmpresaLogadaService: ControleEmpresaLogadaService,
              private loadingService: LoadingService,
              private telefonePipe: TelefonePipe) {
    this.title.setTitle('3G Brasil - Empresa - Pesquisa');
  }

  paginatorLength = 10;
  paginaAtual = 0;

  filter = new EmpresaFilter();
  empresas = [];
  cols: Column[] = [
    {field: 'fantasia', header: 'Fantasia', width: 35},
    {field: 'tipoambiente', header: 'Ambiente', width: 20},
    {field: 'tpemis', header: 'Forma de Emissão', width: 20},
    {field: 'cnpj', header: 'CNPJ', pipe: this.cnpjPipe, width: 20}
  ];
  actions: Action[] = [
    {
      key: 3, icon: 'i-File-Hide', color: ActionColor.LIGHT,
      tooltip: 'Certificado', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_CERTIFICADO')
    },
    {key: 4, icon: 'i-Gear', color: ActionColor.SECONDARY, tooltip: 'Configurações', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_EMPRESA')},
    {key: 1, icon: 'i-Edit', color: ActionColor.INFO, tooltip: 'Editar', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_EMPRESA')},
    {key: 2, icon: 'i-Remove', color: ActionColor.DANGER, tooltip: 'Excluír', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_EMPRESA')}
  ];

  actionPerformed(event) {
    switch (event.key) {
      case 1:
        this.eventoEditar(event.data);
        break;
      case 2:
        this.eventoExcluir(event.data);
        break;
      case 3:
        this.router.navigate(['/empresa/certificado/pesquisa', event.data.idempresa]);
        break;
      case 4:
        this.router.navigate(['/empresa/configuracoes', event.data.idempresa]);
        break;
    }
  }

  eventoEditar(data) {
    this.router.navigate(['/empresa', data.idempresa]);
  }

  eventoExcluir(data) {
    const dialogReference = this.modalService.open(RemoveConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    dialogReference.componentInstance.data = {
      modalTitle: 'Remover Empresa',
      objectToRemoveName: data.fantasia
    };

    dialogReference.result
      .then((result) => {
        if (result) {
          this.empresaService.delete(data.idempresa)
            .then(() => {
              this.toast.success('Empresa deletada com sucesso.');
              this.pesquisar(this.paginaAtual);
              this.controleEmpresaLogadaService.atualizarServico()
                .then(() => null).catch(() => null);
            })
            .catch(err => this.errorHandler.show(err));
        }
      }).catch(() => null);
  }

  onPageChange(event) {
    this.filter.size = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.pesquisar(event.offset);
  }

  pesquisar(page = 0) {
    this.filter.page = page;
    this.empresaService.filter(this.filter)
      .then(response => {
        this.empresas = response.empresas;
        this.paginatorLength = response.total;
      })
      .catch(() => null);
  }

  ngOnInit() {
    this.loadingService.show();
    this.pesquisar();
  }

  ngAfterViewInit() {
    this.loadingService.dismiss();
  }

}

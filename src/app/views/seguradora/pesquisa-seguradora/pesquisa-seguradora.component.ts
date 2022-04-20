import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SeguradoraFilter, SeguradoraService } from '../../../shared/services/seguradora/seguradora.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { TelefonePipe } from '../../../shared/pipes/telefone-pipe';
import { LoadingService } from '../../../shared/services/util/loading.service';
import { Action, ActionColor, Column } from '../../../shared/components/table/table.component';
import { RemoveConfirmModalComponent } from '../../../shared/components/util/remove-confirm-modal/remove-confirm-modal.component';
import { CNPJPipe } from '../../../shared/pipes/cnpj-pipe';

@Component({
  selector: 'app-pesquisa-seguradora',
  templateUrl: './pesquisa-seguradora.component.html',
  styleUrls: ['./pesquisa-seguradora.component.scss']
})
export class PesquisaSeguradoraComponent implements OnInit, AfterViewInit {

  constructor(private title: Title,
              private seguradoraService: SeguradoraService,
              public auth: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private cnpjPipe: CNPJPipe,
              private telefonePipe: TelefonePipe,
              private loadingService: LoadingService) {
    this.title.setTitle('3G Brasil - Seguradora - Pesquisa');
  }

  paginatorLength = 10;
  paginaAtual = 0;

  filter = new SeguradoraFilter();
  seguradoras = [];
  cols: Column[] = [
    {field: 'nomeseguradora', header: 'Seguradora', width: 80},
    {field: 'cnpjseguradora', header: 'CNPJ', pipe: this.cnpjPipe, width: 50},
    {field: 'cpfcnpjresponsavel', header: 'CPF/CNPJ Responsável', width: 50}
  ];
  actions: Action[] = [
    {key: 1, icon: 'i-Edit', color: ActionColor.INFO, tooltip: 'Editar', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_SEGURADORA')},
    {key: 2, icon: 'i-Remove', color: ActionColor.DANGER, tooltip: 'Excluír', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_SEGURADORA')}
  ];

  ngOnInit() {
    this.loadingService.show();
    this.pesquisar();
  }

  ngAfterViewInit() {
    this.loadingService.dismiss();
  }

  actionPerformed(event) {
    switch (event.key) {
      case 1:
        this.eventoEditar(event.data);
        break;
      case 2:
        this.eventoExcluir(event.data);
        break;
    }
  }

  eventoEditar(data) {
    this.router.navigate(['/seguradora', data.idSeguradora]);
  }

  eventoExcluir(data) {
    const dialogReference = this.modalService.open(RemoveConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    dialogReference.componentInstance.data = {
      modalTitle: 'Remover Seguradora',
      objectToRemoveName: data.nomeseguradora
    };

    dialogReference.result
      .then((result) => {
        if (result) {
          this.seguradoraService.delete(data.idSeguradora)
            .then(() => {
              this.toast.success('Seguradora deletado(a) com sucesso.');
              this.pesquisar(this.paginaAtual);
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
    this.seguradoraService.filter(this.filter)
      .then(response => {
        this.seguradoras = response.seguradoras;
        this.paginatorLength = response.total;
      })
      .catch(() => null);
  }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MotoristaFilter, MotoristaService } from '../../../shared/services/motorista/motorista.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { CPFPipe } from '../../../shared/pipes/cpf-pipe';
import { TelefonePipe } from '../../../shared/pipes/telefone-pipe';
import { LoadingService } from '../../../shared/services/util/loading.service';
import { Action, ActionColor, Column } from '../../../shared/components/table/table.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoveConfirmModalComponent } from '../../../shared/components/util/remove-confirm-modal/remove-confirm-modal.component';

@Component({
  selector: 'app-pesquisa-motorista',
  templateUrl: './pesquisa-motorista.component.html',
  styleUrls: ['./pesquisa-motorista.component.scss']
})
export class PesquisaMotoristaComponent implements OnInit, AfterViewInit {

  constructor(private title: Title,
              private motoristaService: MotoristaService,
              public auth: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private cpfPipe: CPFPipe,
              private telefonePipe: TelefonePipe,
              private loadingService: LoadingService) {
    this.title.setTitle('3G Brasil - Motorista - Pesquisa');
  }

  paginatorLength = 10;
  paginaAtual = 0;

  filter = new MotoristaFilter();
  motoristas = [];
  cols: Column[] = [
    {field: 'nome', header: 'Nome', width: 80},
    {field: 'cpf', header: 'CPF', width: 80},
    {field: 'telefone', header: 'Telefone', width: 80}
  ];
  actions: Action[] = [
    {key: 1, icon: 'i-Edit', color: ActionColor.INFO, tooltip: 'Editar', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_MOTORISTA')},
    {key: 2, icon: 'i-Remove', color: ActionColor.DANGER, tooltip: 'Excluír', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_MOTORISTA')}
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
    this.router.navigate(['/motorista', data.idmotorista]);
  }

  eventoExcluir(data) {
    const dialogReference = this.modalService.open(RemoveConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    dialogReference.componentInstance.data = {
      modalTitle: 'Remover Motorista',
      objectToRemoveName: data.nome
    };

    dialogReference.result
      .then((result) => {
        if (result) {
          this.motoristaService.delete(data.idmotorista)
            .then(() => {
              this.toast.success('Motorista deletado(a) com sucesso.');
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
    this.motoristaService.filter(this.filter)
      .then(response => {
        this.motoristas = response.motoristas;
        this.paginatorLength = response.total;
      })
      .catch(() => null);
  }
}

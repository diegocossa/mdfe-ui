import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VeiculoFilter, VeiculoService } from '../../../shared/services/veiculo/veiculo.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { LoadingService } from '../../../shared/services/util/loading.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Action, ActionColor, Column } from '../../../shared/components/table/table.component';
import { RemoveConfirmModalComponent } from '../../../shared/components/util/remove-confirm-modal/remove-confirm-modal.component';

@Component({
  selector: 'app-pesquisa-veiculo',
  templateUrl: './pesquisa-veiculo.component.html',
  styleUrls: ['./pesquisa-veiculo.component.scss']
})
export class PesquisaVeiculoComponent implements OnInit, AfterViewInit {

  constructor(private title: Title,
              private veiculoService: VeiculoService,
              public auth: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private loadingService: LoadingService) {
    this.title.setTitle('3G Brasil - Veiculo - Pesquisa');
  }

  paginatorLength = 10;
  paginaAtual = 0;

  filter = new VeiculoFilter();
  veiculos = [];
  cols: Column[] = [
    {field: 'placa', header: 'Placa', width: 50},
    {field: 'renavam', header: 'RENAVAM', width: 50},
    {field: 'uf', header: 'UF', width: 50}
  ];
  actions: Action[] = [
    {key: 1, icon: 'i-Edit', color: ActionColor.INFO, tooltip: 'Editar', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_VEICULO')},
    {key: 2, icon: 'i-Remove', color: ActionColor.DANGER, tooltip: 'Excluír', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_VEICULO')}
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
    this.router.navigate(['/veiculo', data.idveiculo]);
  }

  eventoExcluir(data) {
    const dialogReference = this.modalService.open(RemoveConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    dialogReference.componentInstance.data = {
      modalTitle: 'Remover Veículo',
      objectToRemoveName: data.placa
    };

    dialogReference.result
      .then((result) => {
        if (result) {
          this.veiculoService.delete(data.idveiculo)
            .then(() => {
              this.toast.success('Veículo deletado com sucesso.');
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
    this.veiculoService.filter(this.filter)
      .then(response => {
        this.veiculos = response.veiculos;
        this.paginatorLength = response.total;
      })
      .catch(() => null);
  }

}

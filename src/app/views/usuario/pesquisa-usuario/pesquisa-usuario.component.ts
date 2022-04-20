import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../shared/services/util/toast.service';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { TelefonePipe } from '../../../shared/pipes/telefone-pipe';
import { LoadingService } from '../../../shared/services/util/loading.service';
import { Action, ActionColor, Column } from '../../../shared/components/table/table.component';
import { RemoveConfirmModalComponent } from '../../../shared/components/util/remove-confirm-modal/remove-confirm-modal.component';
import { UsuarioFilter, UsuarioService } from '../../../shared/services/usuario/usuario.service';
import { CPFPipe } from '../../../shared/pipes/cpf-pipe';

@Component({
  selector: 'app-pesquisa-usuario',
  templateUrl: './pesquisa-usuario.component.html',
  styleUrls: ['./pesquisa-usuario.component.scss']
})
export class PesquisaUsuarioComponent implements OnInit, AfterViewInit {

  constructor(private title: Title,
              private usuarioService: UsuarioService,
              public auth: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private cpfPipe: CPFPipe,
              private telefonePipe: TelefonePipe,
              private loadingService: LoadingService) {
    this.title.setTitle('3G Brasil - Usuário - Pesquisa');
  }

  paginatorLength = 10;
  paginaAtual = 0;

  filter = new UsuarioFilter();
  usuarios = [];
  cols: Column[] = [
    {field: 'nome', header: 'Nome', width: 50},
    {field: 'email', header: 'E-mail', width: 50},
    {field: 'cpf', header: 'CPF', pipe: this.cpfPipe, width: 50},
    {field: 'fone', header: 'Telefone', pipe: this.telefonePipe, width: 50}
  ];
  actions: Action[] = [
    {key: 1, icon: 'i-Edit', color: ActionColor.INFO, tooltip: 'Editar', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_USUARIO')},
    {key: 2, icon: 'i-Remove', color: ActionColor.DANGER, tooltip: 'Excluír', disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_USUARIO')}
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
    this.router.navigate(['/usuario', data.idpessoa]);
  }

  eventoExcluir(data) {
    const dialogReference = this.modalService.open(RemoveConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    dialogReference.componentInstance.data = {
      modalTitle: 'Remover Usuário',
      objectToRemoveName: data.nome
    };

    dialogReference.result
      .then((result) => {
        if (result) {
          this.usuarioService.delete(data.idpessoa)
            .then(() => {
              this.toast.success('Usuário deletado(a) com sucesso.');
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
    this.usuarioService.filter(this.filter)
      .then(response => {
        this.usuarios = response.usuarios;
        this.paginatorLength = response.total;
      })
      .catch(() => null);
  }
}

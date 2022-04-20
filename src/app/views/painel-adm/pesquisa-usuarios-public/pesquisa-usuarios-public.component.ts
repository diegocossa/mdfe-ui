import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {UsuarioFilter, UsuarioService} from "../../../shared/services/usuario/usuario.service";
import {AuthService, UsuarioLogin} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../../shared/services/util/toast.service";
import {ErrorHandlerService} from "../../../shared/services/util/error-handler.service";
import {CPFPipe} from "../../../shared/pipes/cpf-pipe";
import {TelefonePipe} from "../../../shared/pipes/telefone-pipe";
import {LoadingService} from "../../../shared/services/util/loading.service";
import {Action, ActionColor, Column} from "../../../shared/components/table/table.component";
import {ModalSenhaAdmComponent} from "../modal-senha-adm/modal-senha-adm.component";

@Component({
  selector: 'app-pesquisa-usuarios-public',
  templateUrl: './pesquisa-usuarios-public.component.html',
  styleUrls: ['./pesquisa-usuarios-public.component.scss']
})
export class PesquisaUsuariosPublicComponent implements OnInit, AfterViewInit {

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
    this.title.setTitle('3G Brasil - Clientes / Migração - Pesquisa');
  }

  paginatorLength = 10;
  paginaAtual = 0;

  filter = new UsuarioFilter();

  user: UsuarioLogin;

  usuarios = [];
  cols: Column[] = [
    {field: 'nome', header: 'Nome' },
    {field: 'email', header: 'E-mail' },
    {field: 'cpf', header: 'CPF', pipe: this.cpfPipe, paramx: null, paramy: null, paramz: null},
    {field: 'tenantid', header: 'Tenant ID' }
  ];
  actions: Action[] = [
    {key: 1, icon: 'i-Start-2', color: ActionColor.INFO, tooltip: 'Logar-se neste tenancy..', disabled: false }
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
        this.eventoLogar(event.data);
        break;
    }
  }

  eventoLogar(data) {
    this.user = new UsuarioLogin();
    this.user.email = data.tenantid + '@3gbrasil.com.br';

    const dialogReference = this.modalService.open(ModalSenhaAdmComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm'});

    dialogReference.result
      .then((result) => {
        this.user.senha = result.senhaAdm;
        this.auth.login(this.user)
          .then(() => {
            this.router.navigate(['']);
          })
          .catch(error => {
            this.errorHandler.show(error);
          })
      }).catch((reject) => {
    });
  }

  onPageChange(event) {
    this.filter.size = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.pesquisar(event.offset);
  }

  pesquisar(page = 0) {
    this.filter.page = page;
    this.usuarioService.filterOnPublic(this.filter)
      .then(response => {
        this.usuarios = response.usuarios;
        this.paginatorLength = response.total;
      })
      .catch(() => null);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { LogoutService } from '../../../../services/auth/logout.service';
import { Router } from '@angular/router';
import { ControleEmpresaLogadaService } from '../../../../services/auth/controles/controle-empresa-logada.service';
import { ToastService } from '../../../../services/util/toast.service';
import { ErrorHandlerService } from '../../../../services/util/error-handler.service';

@Component({
  selector: 'app-header-sidebar-compact',
  templateUrl: './header-sidebar-compact.component.html',
  styleUrls: ['./header-sidebar-compact.component.scss']
})
export class HeaderSidebarCompactComponent implements OnInit {
  notifications: any[];

  constructor(
    private navService: NavigationService,
    public searchService: SearchService,
    private logoutService: LogoutService,
    private router: Router,
    public controleEmpresaLogadaService: ControleEmpresaLogadaService,
    private toast: ToastService,
    private errorHandler: ErrorHandlerService
  ) {
    this.notifications = [
      {
        icon: 'i-Speach-Bubble-6',
        title: 'New message',
        badge: '3',
        text: 'James: Hey! are you busy?',
        time: new Date(),
        status: 'primary',
        link: '/chat'
      },
      {
        icon: 'i-Receipt-3',
        title: 'New order received',
        badge: '$4036',
        text: '1 Headphone, 3 iPhone x',
        time: new Date('11/11/2018'),
        status: 'success',
        link: '/tables/full'
      },
      {
        icon: 'i-Empty-Box',
        title: 'Product out of stock',
        text: 'Headphone E67, R98, XL90, Q77',
        time: new Date('11/10/2018'),
        status: 'danger',
        link: '/tables/list'
      },
      {
        icon: 'i-Data-Power',
        title: 'Server up!',
        text: 'Server rebooted successfully',
        time: new Date('11/08/2018'),
        status: 'success',
        link: '/painel/v2'
      },
      {
        icon: 'i-Data-Block',
        title: 'Server down!',
        badge: 'Resolved',
        text: 'Region 1: Server crashed!',
        time: new Date('11/06/2018'),
        status: 'danger',
        link: '/painel/v3'
      }
    ];
  }

  ngOnInit() {
    this.controleEmpresaLogadaService.atualizarServico();
  }

  trocarEmpresa(idempresa: number) {
    this.controleEmpresaLogadaService.setEmpresaLogada(idempresa)
      .then(conseguiuAtribuirEmpresa => {
        if (conseguiuAtribuirEmpresa) {
          this.toast.success(`Estamos na ${this.controleEmpresaLogadaService.empresaLogada.fantasia}`);
          this.router.navigate(['/painel', this.controleEmpresaLogadaService.empresaLogada.idempresa]);
        }
      })
      .catch(() => null);
  }

  toggelSidebar() {
    const state = this.navService.sidebarState;
    state.sidenavOpen = !state.sidenavOpen;
    state.childnavOpen = !state.childnavOpen;
  }

  signout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/sessions/signin']);
      }).catch(err => {
      /* TODO: Atualizar o erro. */
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AuthService} from "./auth/auth.service";

export interface IMenuItem {
  id?: string;
  title?: string;
  description?: string;
  type: string;       // Possible values: link/dropDown/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  active?: boolean;
  menuVisivel?: boolean;
}

export interface IChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string;       // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

interface ISidebarState {
  sidenavOpen?: boolean;
  childnavOpen?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public sidebarState: ISidebarState = {
    sidenavOpen: true,
    childnavOpen: false
  };

  constructor(private authService: AuthService) {

  }

  defaultMenu: IMenuItem[] = this.setarMenu();

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  setarMenu() {
    if (this.authService.hasAuthority('ROLE_PAINEL_ADM')){
      return [
        {
          name: 'Painel Principal',
          description: 'Painel com os seus manifestos.',
          type: 'link',
          icon: 'i-Home1',
          state: '/painel',
          tooltip: 'Painel Principal'
        },
        {
          name: 'Gerar Manifesto',
          description: 'Cadastrar um novo manifesto.',
          type: 'link',
          icon: 'i-Add-File',
          state: '/mdfe/cadastro',
          tooltip: 'Gerar Manifesto'
        },
        {
          name: 'Cadastros',
          description: 'Cadastros gerais do sistema.',
          type: 'dropDown',
          icon: 'i-Folders',
          tooltip: 'Cadastros Principais',
          sub: [
            {icon: 'i-Management', name: 'Empresa', state: '/empresa', type: 'link'},
            {icon: 'i-Engineering', name: 'Motorista', state: '/motorista', type: 'link'},
            {icon: 'i-Jeep', name: 'Veículo', state: '/veiculo', type: 'link'},
            {icon: 'i-Firewall', name: 'Seguradora', state: '/seguradora', type: 'link'},
            {icon: 'i-Administrator', name: 'Usuário', state: '/usuario', type: 'link'},
          ]
        },
        {
          name: 'Painel Administrativo',
          description: 'Administração 3G Brasil.',
          type: 'dropDown',
          icon: 'i-Gear',
          tooltip: 'Painel Administrativo',
          menuVisivel: false,
          sub: [
            {icon: 'i-Management', name: 'Clientes / Migração', state: '/painel-adm/pesquisa-usuarios-public', type: 'link'}
          ]
        }
      ];
    } else {
      return [
        {
          name: 'Painel Principal',
          description: 'Painel com os seus manifestos.',
          type: 'link',
          icon: 'i-Home1',
          state: '/painel',
          tooltip: 'Painel Principal'
        },
        {
          name: 'Gerar Manifesto',
          description: 'Cadastrar um novo manifesto.',
          type: 'link',
          icon: 'i-Add-File',
          state: '/mdfe/cadastro',
          tooltip: 'Gerar Manifesto'
        },
        {
          name: 'Cadastros',
          description: 'Cadastros gerais do sistema.',
          type: 'dropDown',
          icon: 'i-Folders',
          tooltip: 'Cadastros Principais',
          sub: [
            {icon: 'i-Management', name: 'Empresa', state: '/empresa', type: 'link'},
            {icon: 'i-Engineering', name: 'Motorista', state: '/motorista', type: 'link'},
            {icon: 'i-Jeep', name: 'Veículo', state: '/veiculo', type: 'link'},
            {icon: 'i-Firewall', name: 'Seguradora', state: '/seguradora', type: 'link'},
            {icon: 'i-Administrator', name: 'Usuário', state: '/usuario', type: 'link'},
          ]
        }
      ];
    }
  }

  // You can customize this method to supply different menu for
  // different user type.
  // publishNavigationChange(menuType: string) {
  //   switch (userType) {
  //     case 'admin':
  //       this.menuItems.next(this.adminMenu);
  //       break;
  //     case 'user':
  //       this.menuItems.next(this.userMenu);
  //       break;
  //     default:
  //       this.menuItems.next(this.defaultMenu);
  //   }
  // }
}

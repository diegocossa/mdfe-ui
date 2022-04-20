import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent, SelectionType, SortType} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild('datatableComponent') table: DatatableComponent;

  /** Lista de objetos condizentes com o columns. */
  @Input() data: any[];

  /** Lista de colunas respeitando o TableColumn. */
  @Input() columns: Array<Column>;

  /** Modo no qual as colunas vão se ajustar no layout.
   * Default: force. */
  @Input() columnMode: ColumnMode = ColumnMode.force;

  /** Mensagens que serão mostradas pela DataTable. */
  @Input() messages: any = {
    emptyMessage: 'Nenhum registro encontrado...',
    totalMessage: 'total.',
    selectedMessage: 'selecionado'
  };

  /** Lista de itens selecionados (caso a datatable
   * for do tipo select items). Os itens devem ser
   * um objeto igual aos do data. */
  @Input() selected: any[] = null;

  /** Tipo de seleção da lista. Disponíveis:
   * -> single apenas uma linha selecionada por vez.
   * -> cell apenas uma célula selecionada por vez.
   * -> multi várias linhas selecionadas por ctrl + shift.
   * -> multiClick muilti seleção por click.
   * -> checkbox multiplas linhas selecionadas por checkbox. */
  @Input() selectionType: SelectionType;

  /** Lista de ordenação default. */
  @Input() sorts: any[];

  /** Tipo da ordenação. Disponíveis:
   * -> single apenas uma coluna por vez.
   * -> multi várias colunas por vez. */
  @Input() sortType: SortType;

  /** Total de itens por pàgina, default: 20. */
  @Input() count = 20;

  /** Define se a datatable possui paginação externa.*/
  @Input() externalPaging = false;

  /** Define se a datatable possui ordenação externa.*/
  @Input() externalSorting = false;

  /** Lista de objetos condizentes com o columns. */
  @Input() pageSize = 10;

  @Input() colActionWidth = 150;

  /** Ações em cima de cada linha, ao cli-
   * car na ação o sistema vai disparar o
   * evento actionPerformed passando a key
   * e os dados.*/
  @Input() actions: Array<Action>;
  @Output() actionPerformed = new EventEmitter();

  /** Evento de paginação da datatable, valores emitidos:
   * count / pageSize / limit / offset
   * offset é a página na qual o usuário clicou/foi. */
  @Output() page = new EventEmitter();

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.table._innerWidth = window.innerWidth - 300;
      this.table.recalculate();
    }, 100);
  }

  /** Emite a ação para o componente pai informando
   * a ação que o usuário tomou sob determinado dado. */
  onActionPerformed(event: any) {
    this.actionPerformed.emit(event);
  }

  /* Este método emite o evento page quando o usuário
  altera a página no paginator da datatable. */
  onPageChange(event: any) {
    this.page.emit(event);
  }

}

export class Column {
  field: string;
  header: string;

  width ? = 150;
  backgroundColor ? = null;

  buttonEvent ? = false;
  actionButton ? = null;

  sortable ? = false;

  pipe ? = null;
  paramx ? = null;
  paramy ? = null;
  paramz ? = null;
}

export class Action {
  key: number;
  icon: string;
  tooltip: string;

  text ? = null;

  /** Valores compatíveis na constante
   * ActionColor. */
  color: string;

  disabled = false;
}

/** Valores que a classe Action aceita em
 * seu campo "color". */
export const ActionColor = {
  PRIMARY: 'btn-primary',
  SECONDARY: 'btn-secondary',
  SUCCESS: 'btn-success',
  DANGER: 'btn-danger',
  WARN: 'btn-warning',
  INFO: 'btn-info',
  LIGHT: 'btn-light',
  DARK: 'btn-dark'
};

/** Valores que a classe Column aceita em
 * seu campo "backgroundColor". */
export const ColumnBackgroundColor = {
  PRIMARY: 'badge-primary',
  SECONDARY: 'badge-secondary',
  SUCCESS: 'badge-success',
  DANGER: 'badge-danger',
  WARN: 'badge-warning',
  INFO: 'badge-info',
  LIGHT: 'badge-light',
  DARK: 'badge-dark'
}

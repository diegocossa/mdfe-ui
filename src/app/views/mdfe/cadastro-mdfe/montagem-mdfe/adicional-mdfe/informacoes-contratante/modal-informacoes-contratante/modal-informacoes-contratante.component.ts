import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class ModalInformacoesContratanteData {
  informacaoContratante: any;
}

@Component({
  selector: 'app-modal-informacoes-contratante',
  templateUrl: './modal-informacoes-contratante.component.html',
  styleUrls: ['./modal-informacoes-contratante.component.scss']
})
export class ModalInformacoesContratanteComponent implements OnInit {
  data: ModalInformacoesContratanteData;

  tipoResponsavel = 'CPF';

  tiposResponsaveis = [
    {label: 'Pessoa Física', value: 'CPF'},
    {label: 'Pessoa Jurídica', value: 'CNPJ'}
  ];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  salvarContratante() {
    this.activeModal.close({autorizado: this.data.informacaoContratante});
  }

  fecharModal() {
    this.activeModal.dismiss({autorizado: this.data.informacaoContratante});
  }

}

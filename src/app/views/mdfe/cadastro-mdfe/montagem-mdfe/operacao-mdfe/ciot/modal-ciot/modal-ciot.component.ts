import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class ModalCIOTData {
  ciot: any;
}

@Component({
  selector: 'app-modal-ciot',
  templateUrl: './modal-ciot.component.html',
  styleUrls: ['./modal-ciot.component.scss']
})
export class ModalCiotComponent implements OnInit {
  data: ModalCIOTData;

  tipoResponsavel = 'CPF';

  tiposResponsaveis = [
    {label: 'CPF', value: 'CPF'},
    {label: 'CNPJ', value: 'CNPJ'}
  ];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  salvarCIOT() {
    this.activeModal.close({autorizado: this.data.ciot});
  }

  fecharModal() {
    this.activeModal.dismiss({autorizado: this.data.ciot});
  }

}

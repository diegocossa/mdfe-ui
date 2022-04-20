import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class ModalValeData {
  valePedagio: any;
}

@Component({
  selector: 'app-modal-vale-pedagio',
  templateUrl: './modal-vale-pedagio.component.html',
  styleUrls: ['./modal-vale-pedagio.component.scss']
})
export class ModalValePedagioComponent implements OnInit {
  data: ModalValeData;

  tipoResponsavel = 'CPF';

  tiposResponsaveis = [
    {label: 'Pessoa Física', value: 'CPF'},
    {label: 'Pessoa Jurídica', value: 'CNPJ'}
  ];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  salvarVale() {
    this.activeModal.close({valepedagio: this.data.valePedagio});
  }

  fecharModal() {
    this.activeModal.dismiss({valepedagio: this.data.valePedagio});
  }

}

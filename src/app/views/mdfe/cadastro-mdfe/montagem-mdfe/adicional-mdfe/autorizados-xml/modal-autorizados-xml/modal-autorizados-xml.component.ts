import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class ModalAutorizadosData {
  autorizado: any;
}

@Component({
  selector: 'app-modal-autorizados-xml',
  templateUrl: './modal-autorizados-xml.component.html',
  styleUrls: ['./modal-autorizados-xml.component.scss']
})
export class ModalAutorizadosXmlComponent implements OnInit {
  data: ModalAutorizadosData;

  tipoAutorizado = 'CPF';

  tiposAutorizados = [
    {label: 'CPF', value: 'CPF'},
    {label: 'CNPJ', value: 'CNPJ'}
  ];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  salvarAutorizado() {
    this.activeModal.close({autorizado: this.data.autorizado});
  }

  fecharModal() {
    this.activeModal.dismiss({autorizado: this.data.autorizado});
  }

}

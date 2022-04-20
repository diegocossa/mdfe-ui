import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

export class ModalDocumentoData {
  unidadeCarga: FormGroup;
}

@Component({
  selector: 'app-modal-formulario-unidade-carga',
  templateUrl: './modal-formulario-unidade-carga.component.html',
  styleUrls: ['./modal-formulario-unidade-carga.component.scss']
})
export class ModalFormularioUnidadeCargaComponent implements OnInit {
  data: ModalDocumentoData;

  tiposUnidade = [
    {label: 'Container', value: '1'},
    {label: 'ULD', value: '2'},
    {label: 'Pallet', value: '3'},
    {label: 'Outros', value: '4'},
  ];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  salvarUnidadeCarga() {
    this.activeModal.close({unidadeCarga: this.data.unidadeCarga});
  }

}

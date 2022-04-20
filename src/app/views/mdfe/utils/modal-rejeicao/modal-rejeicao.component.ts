import { Component, OnInit } from '@angular/core';
import {MDFe} from "../../../../shared/models/mdfe/mdfe";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

export class ModalRejeicaoData {
  mdfe: MDFe;
}

@Component({
  selector: 'app-modal-rejeicao',
  templateUrl: './modal-rejeicao.component.html',
  styleUrls: ['./modal-rejeicao.component.scss']
})
export class ModalRejeicaoComponent implements OnInit {
  data: ModalRejeicaoData;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  fecharModal() {
    this.activeModal.dismiss();
  }

}

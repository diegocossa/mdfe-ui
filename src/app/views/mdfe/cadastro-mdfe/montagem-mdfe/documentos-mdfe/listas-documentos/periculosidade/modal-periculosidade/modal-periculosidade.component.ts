import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

export class ModalPericulosidadeData {
  periculosidade: FormGroup
}

@Component({
  selector: 'app-modal-periculosidade',
  templateUrl: './modal-periculosidade.component.html',
  styleUrls: ['./modal-periculosidade.component.scss']
})
export class ModalPericulosidadeComponent implements OnInit {
  data: ModalPericulosidadeData;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  salvarPericulosidade() {
    this.activeModal.close({periculosidade: this.data.periculosidade});
  }

  fecharModal() {
    this.activeModal.dismiss({periculosidade: this.data.periculosidade});
  }

}

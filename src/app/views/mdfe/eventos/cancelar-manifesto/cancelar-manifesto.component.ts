import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-cancelar-manifesto',
  templateUrl: './cancelar-manifesto.component.html',
  styleUrls: ['./cancelar-manifesto.component.scss']
})
export class CancelarManifestoComponent implements OnInit {
  formCancelamento = this.fb.group({
    motivo: [null, Validators.compose([
      Validators.required, Validators.maxLength(255)
    ])]
  });

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  fecharModal() {
    this.activeModal.dismiss();
  }

  cancelarManifesto() {
    this.activeModal.close(this.formCancelamento.value);
  }
}

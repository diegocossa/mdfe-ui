import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-senha-adm',
  templateUrl: './modal-senha-adm.component.html',
  styleUrls: ['./modal-senha-adm.component.scss']
})
export class ModalSenhaAdmComponent implements OnInit {
  formSenha = this.fb.group({
    senhaAdm: [null, Validators.compose([
      Validators.required
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

  enviarSenha() {
    this.activeModal.close(this.formSenha.value);
  }
}

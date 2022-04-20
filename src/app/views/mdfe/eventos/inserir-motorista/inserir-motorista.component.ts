import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MotoristaService} from "../../../../shared/services/motorista/motorista.service";

@Component({
  selector: 'app-inserir-motorista',
  templateUrl: './inserir-motorista.component.html',
  styleUrls: ['./inserir-motorista.component.scss']
})
export class InserirMotoristaComponent implements OnInit {

  formInclusao = this.fb.group({
    motorista: [null, Validators.required]
  });

  motoristas = [];

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private motoristaService: MotoristaService) {
  }

  ngOnInit() {
    this.carregarMotoristas();
  }

  carregarMotoristas() {
    this.motoristaService.findAll()
      .then(response => {
        this.motoristas = response;
      })
      .catch(err => {

      });
  }


  fecharModal() {
    this.activeModal.dismiss();
  }

  incluirCondutor() {
    this.activeModal.close(this.formInclusao.value);
  }
}

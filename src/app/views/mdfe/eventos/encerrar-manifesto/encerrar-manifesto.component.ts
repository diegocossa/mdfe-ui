import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IBGEService} from "../../../../shared/services/util/ibge.service";

@Component({
  selector: 'app-encerrar-manifesto',
  templateUrl: './encerrar-manifesto.component.html',
  styleUrls: ['./encerrar-manifesto.component.scss']
})
export class EncerrarManifestoComponent implements OnInit {

  formEncerramento = this.fb.group({
    uf: [null, Validators.required],
    codigomunicipio: [null, Validators.required]
  });

  ufs = [];
  municipios = [];

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private ibgeService: IBGEService) {
  }

  ngOnInit() {
    this.carregarUFs();
  }

  carregarUFs() {
    this.ibgeService.getUFs()
      .then(response => {
        this.ufs = response;
      })
      .catch(err => {

      });
  }

  carregarMunicipios(evento: any) {
    this.ibgeService.getMunicipios(evento.id)
      .then(response => {
        this.municipios = response;
      })
      .catch(err => {

      });
  }

  fecharModal() {
    this.activeModal.dismiss();
  }

  encerrarManifesto() {
    this.activeModal.close({ formEncerramento: this.formEncerramento.value });
  }
}

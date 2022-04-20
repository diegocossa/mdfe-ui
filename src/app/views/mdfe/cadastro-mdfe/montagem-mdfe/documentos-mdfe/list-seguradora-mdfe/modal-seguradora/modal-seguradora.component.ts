import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SeguradoraService } from '../../../../../../../shared/services/seguradora/seguradora.service';

export class ModalSeguradoraData {
  seguradora: any;
}

@Component({
  selector: 'app-modal-seguradora',
  templateUrl: './modal-seguradora.component.html',
  styleUrls: ['./modal-seguradora.component.scss']
})
export class ModalSeguradoraComponent implements OnInit {
  data: ModalSeguradoraData;

  seguradoras = [];

  constructor(public activeModal: NgbActiveModal,
              private seguradoraService: SeguradoraService) {
  }

  ngOnInit() {
    this.carregarSeguradoras();
  }

  carregarSeguradoras() {
    this.seguradoras = [];
    this.seguradoraService.findAll()
      .then(response => {
        this.seguradoras = response;
      })
      .catch(error => {
      });
  }

  salvarSeguradora() {
    this.activeModal.close({seguradora: this.data.seguradora});
  }

  fecharModal() {
    this.activeModal.dismiss({seguradora: this.data.seguradora});
  }

}

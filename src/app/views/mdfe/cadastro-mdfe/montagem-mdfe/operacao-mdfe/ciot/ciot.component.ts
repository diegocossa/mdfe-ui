import { Component, Input, OnInit } from '@angular/core';
import { CNPJPipe } from '../../../../../../shared/pipes/cnpj-pipe';
import { CPFPipe } from '../../../../../../shared/pipes/cpf-pipe';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCiotComponent } from './modal-ciot/modal-ciot.component';
import { MDFeUtils } from '../../../mdfe-utils';

@Component({
  selector: 'app-ciot',
  templateUrl: './ciot.component.html',
  styleUrls: ['./ciot.component.scss']
})
export class CiotComponent implements OnInit {

  constructor(public cnpjPipe: CNPJPipe,
              public cpfPipe: CPFPipe,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  @Input() infciotlist: FormArray;

  mdfeUtils = new MDFeUtils();

  idCIOTAuxiliar = 0;

  ngOnInit() {
  }

  adicionarCIOT() {
    const ciot = this.mdfeUtils.getCiotForm();
    ciot.get('idciottemporario').setValue(this.idCIOTAuxiliar++);

    this.infciotlist.push(ciot);

    this.abrirModalCIOT(ciot);
  }

  abrirModalCIOT(ciot: any) {
    const dialogReference = this.modalService.open(ModalCiotComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      ciot
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  removerCIOT(ciot: any) {
    if (ciot.get('idinfciot').value) {
      this.infciotlist.removeAt(this.infciotlist.getRawValue().findIndex(
        x => x.idinfciot === ciot.get('idinfciot').value));
    } else {
      this.infciotlist.removeAt(this.infciotlist.getRawValue().findIndex(
        x => x.idciottemporario === ciot.get('idciottemporario').value));
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CNPJPipe } from '../../../../../../shared/pipes/cnpj-pipe';
import { CPFPipe } from '../../../../../../shared/pipes/cpf-pipe';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalValePedagioComponent } from './modal-vale-pedagio/modal-vale-pedagio.component';
import { MDFeUtils } from '../../../mdfe-utils';

@Component({
  selector: 'app-vale-pedagio',
  templateUrl: './vale-pedagio.component.html',
  styleUrls: ['./vale-pedagio.component.scss']
})
export class ValePedagioComponent implements OnInit {
  constructor(public cnpjPipe: CNPJPipe,
              public cpfPipe: CPFPipe,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  @Input() valepedagiolist: FormArray;

  idValeAuxiliar = 0;

  mdfeUtils = new MDFeUtils();

  ngOnInit() {
  }

  adicionarValePedagio() {
    const valepedagio = this.mdfeUtils.getValePedagioForm();
    valepedagio.get('idvaletemporario').setValue(this.idValeAuxiliar++);

    this.valepedagiolist.push(valepedagio);

    this.abrirModalVale(valepedagio);
  }

  abrirModalVale(valePedagio: any) {
    const dialogReference = this.modalService.open(ModalValePedagioComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      valePedagio
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  removerVale(vale: any) {
    if (vale.get('idvalepedagio').value) {
      this.valepedagiolist.removeAt(this.valepedagiolist.getRawValue().findIndex(
        x => x.idvalepedagio === vale.get('idvalepedagio').value));
    } else {
      this.valepedagiolist.removeAt(this.valepedagiolist.getRawValue().findIndex(
        x => x.idvaletemporario === vale.get('idvaletemporario').value));
    }
  }
}

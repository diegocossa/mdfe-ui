import { Component, Input, OnInit } from '@angular/core';
import { CNPJPipe } from '../../../../../../shared/pipes/cnpj-pipe';
import { CPFPipe } from '../../../../../../shared/pipes/cpf-pipe';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSeguradoraComponent } from './modal-seguradora/modal-seguradora.component';
import { MDFeUtils } from '../../../mdfe-utils';

@Component({
  selector: 'app-list-seguradora-mdfe',
  templateUrl: './list-seguradora-mdfe.component.html',
  styleUrls: ['./list-seguradora-mdfe.component.scss']
})
export class ListSeguradoraMdfeComponent implements OnInit {

  constructor(public cnpjPipe: CNPJPipe,
              public cpfPipe: CPFPipe,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  @Input() seglist: FormArray;

  idSeguradoraAuxiliar = 0;

  mdfeUtils = new MDFeUtils();

  ngOnInit() {
  }

  adicionarSeguradora() {
    const seguradora = this.mdfeUtils.getSeguradoraForm();
    seguradora.get('idseguradoratemporario').setValue(this.idSeguradoraAuxiliar++);

    this.seglist.push(seguradora);

    this.abrirModalSeguradora(seguradora);
  }

  debug(seg) {
    console.log(seg);
  }

  abrirModalSeguradora(seguradora: any) {
    const dialogReference = this.modalService.open(ModalSeguradoraComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      seguradora
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  removerSeguradora(seguradora: any) {
    if (seguradora.get('idseg').value) {
      this.seglist.removeAt(this.seglist.getRawValue().findIndex(
        x => x.idseg === seguradora.get('idseg').value));
    } else {
      this.seglist.removeAt(this.seglist.getRawValue().findIndex(
        x => x.idseguradoratemporario === seguradora.get('idseguradoratemporario').value));
    }
  }
}

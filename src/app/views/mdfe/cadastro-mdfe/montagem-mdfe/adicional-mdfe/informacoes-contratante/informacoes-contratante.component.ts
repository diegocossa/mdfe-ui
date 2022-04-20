import { Component, Input, OnInit } from '@angular/core';
import { CNPJPipe } from '../../../../../../shared/pipes/cnpj-pipe';
import { CPFPipe } from '../../../../../../shared/pipes/cpf-pipe';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInformacoesContratanteComponent } from './modal-informacoes-contratante/modal-informacoes-contratante.component';
import { MDFeUtils } from '../../../mdfe-utils';

@Component({
  selector: 'app-informacoes-contratante',
  templateUrl: './informacoes-contratante.component.html',
  styleUrls: ['./informacoes-contratante.component.scss']
})
export class InformacoesContratanteComponent implements OnInit {

  constructor(public cnpjPipe: CNPJPipe,
              public cpfPipe: CPFPipe,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  @Input() infcontratantelist: FormArray;

  idInfoAuxiliar = 0;

  mdfeUtils = new MDFeUtils();

  ngOnInit() {
  }

  adicionarInformacaoContratante() {
    const informacaoContratante = this.mdfeUtils.getInformacoesContratanteForm();
    informacaoContratante.get('idinfcontratantetemporario').setValue(this.idInfoAuxiliar++);

    this.infcontratantelist.push(informacaoContratante);

    this.abrirModalInformacaoContratante(informacaoContratante);
  }

  abrirModalInformacaoContratante(informacaoContratante: any) {
    const dialogReference = this.modalService.open(ModalInformacoesContratanteComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      informacaoContratante
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  removerInformacaoContratante(informacaoContratante: any) {
    if (informacaoContratante.get('idinfcontratante').value) {
      this.infcontratantelist.removeAt(this.infcontratantelist.getRawValue().findIndex(
        x => x.idinfcontratante === informacaoContratante.get('idinfcontratante').value));
    } else {
      this.infcontratantelist.removeAt(this.infcontratantelist.getRawValue().findIndex(
        x => x.idinfcontratantetemporario === informacaoContratante.get('idinfcontratantetemporario').value));
    }
  }

}

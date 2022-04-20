import { Component, Input, OnInit } from '@angular/core';
import { CNPJPipe } from '../../../../../../shared/pipes/cnpj-pipe';
import { CPFPipe } from '../../../../../../shared/pipes/cpf-pipe';
import { FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAutorizadosXmlComponent } from './modal-autorizados-xml/modal-autorizados-xml.component';
import { MDFeUtils } from '../../../mdfe-utils';

@Component({
  selector: 'app-autorizados-xml',
  templateUrl: './autorizados-xml.component.html',
  styleUrls: ['./autorizados-xml.component.scss']
})
export class AutorizadosXmlComponent implements OnInit {

  constructor(public cnpjPipe: CNPJPipe,
              public cpfPipe: CPFPipe,
              private modalService: NgbModal) {
  }

  @Input() autorizadosxmllist: FormArray;

  mdfeUtils = new MDFeUtils();

  idAutorizadoAuxiliar = 0;

  ngOnInit() {
  }

  adicionarAutorizadoXML() {
    const autorizadoXML = this.mdfeUtils.getAutorizadosXMLForm();
    autorizadoXML.get('idautorizadotemporario').setValue(this.idAutorizadoAuxiliar++);

    this.autorizadosxmllist.push(autorizadoXML);

    this.abrirModalAutorizadoXML(autorizadoXML);
  }

  abrirModalAutorizadoXML(autorizado: any) {
    const dialogReference = this.modalService.open(ModalAutorizadosXmlComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      autorizado
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  removerAutorizado(autorizado: any) {
    if (autorizado.get('idautorizadosxml').value) {
      this.autorizadosxmllist.removeAt(this.autorizadosxmllist.getRawValue().findIndex(
        x => x.idautorizadosxml === autorizado.get('idautorizadosxml').value));
    } else {
      this.autorizadosxmllist.removeAt(this.autorizadosxmllist.getRawValue().findIndex(
        x => x.idautorizadotemporario === autorizado.get('idautorizadotemporario').value));
    }
  }
}

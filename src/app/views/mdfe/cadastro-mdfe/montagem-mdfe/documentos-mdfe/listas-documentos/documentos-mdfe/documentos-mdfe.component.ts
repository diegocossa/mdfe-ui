import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDocumentoComponent } from './modal-documento/modal-documento.component';
import { MDFeUtils } from '../../../../mdfe-utils';
import {NFeService} from "../../../../../../../shared/services/nfe/nfe.service";
import {ErrorHandlerService} from "../../../../../../../shared/services/util/error-handler.service";
import {ToastService} from "../../../../../../../shared/services/util/toast.service";

@Component({
  selector: 'app-documentos-mdfe',
  templateUrl: './documentos-mdfe.component.html',
  styleUrls: ['./documentos-mdfe.component.scss']
})
export class DocumentosMdfeComponent implements OnInit {

  @Input() infdoclist: FormArray;

  idDocumentoTemporario = 0;

  mdfeUtils = new MDFeUtils();

  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              private nfeService: NFeService,
              private errorHandler: ErrorHandlerService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  adicionarDocumento(tipoDocumento: string) {
    const documento = this.mdfeUtils.getDocumentoForm();
    documento.get('iddocumentoauxiliar').setValue(this.idDocumentoTemporario++);

    switch (tipoDocumento) {
      case 'CTE':
        documento.get('tipodoc').setValue('CTE');
        break;
      case 'NFE':
        documento.get('tipodoc').setValue('NFE');
        break;
    }

    this.infdoclist.push(documento);

    this.abrirModalDocumento(documento);
  }

  abrirModalDocumento(documento: any) {
    const dialogReference = this.modalService.open(ModalDocumentoComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      documento
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  removerDocumento(documento: any) {
    if (documento === null) {
      this.infdoclist.removeAt(
        this.infdoclist.getRawValue().findIndex(x => !x.chavedoc));
    } else {
      if (documento.get('idinfdoc') && documento.get('idinfdoc').value) {
        this.infdoclist.removeAt(
          this.infdoclist.getRawValue().findIndex(x => x.idinfdoc ===
            documento.get('idinfdoc').value));
      } else {
        this.infdoclist.removeAt(
          this.infdoclist.getRawValue().findIndex(x => x.iddocumentoauxiliar ===
            documento.get('iddocumentoauxiliar').value));
      }
    }
  }

  openInputXML() {
    this.toastService.warning('Ei, essa opção funciona apenas para NFe, ainda estamos homologando o CTe! Desculpe pelo transtorno..');
    document.getElementById('fileInput').click();
  }

  fileChange(files: File[]) {
    for (const f of files) {
      const fd = new FormData();
      fd.append('file', f);

      this.nfeService.consultarCampos(fd)
        .then(response => {
          const documento = this.mdfeUtils.getDocumentoForm();
          documento.get('iddocumentoauxiliar').setValue(this.idDocumentoTemporario++);

          documento.get('tipodoc').setValue('NFE');
          documento.get('chavedoc').setValue(response.chave);
          documento.get('peso').setValue(response.pesobruto);
          documento.get('valor').setValue(response.valornfe);

          this.infdoclist.push(documento);
        })
        .catch(err => this.errorHandler.show(err));
    }
  }

}

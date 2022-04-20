import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormularioUnidadeTransporteComponent } from '../../unidade-transporte/modal-formulario-unidade-transporte/modal-formulario-unidade-transporte.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MDFeUtils } from '../../../../../mdfe-utils';

export class ModalDocumentoData {
  documento: FormGroup;
}

@Component({
  selector: 'app-modal-documento',
  templateUrl: './modal-documento.component.html',
  styleUrls: ['./modal-documento.component.scss']
})
export class ModalDocumentoComponent implements OnInit {
  data: ModalDocumentoData;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private fb: FormBuilder) {
  }

  idUnidadeTemporaria = 0;

  mdfeUtils = new MDFeUtils();

  ngOnInit() {
  }

  salvarDocumento() {
    this.activeModal.close({documento: this.data.documento});
  }

  fecharModal() {
    this.activeModal.dismiss({documento: this.data.documento});
  }

  adicionarUnidadeTransporte() {
    if (!this.data.documento.get('infunidtransplist').value) {
      this.data.documento.get('infunidtransplist').setValue([]);
    }

    const unidadeTransporte = this.mdfeUtils.getUnidadeTransporteForm();
    unidadeTransporte.get('idunidadeauxiliar').setValue(this.idUnidadeTemporaria++);

    const control = this.data.documento.get('infunidtransplist') as FormArray;
    control.push(unidadeTransporte);

    this.abrirModalUnidadeTransporte(unidadeTransporte);
  }

  abrirModalUnidadeTransporte(unidadeTransporte) {
    const dialogReference = this.modalService.open(ModalFormularioUnidadeTransporteComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      unidadeTransporte
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  removerUnidade(unidadeTransporte: any) {
    const control = this.data.documento.get('infunidtransplist') as FormArray;
    if (unidadeTransporte === null) {
      control.removeAt(
        control.getRawValue().findIndex(x => !x.tpunidtransp));
    } else {
      if (unidadeTransporte.get('idinfunidcarga') && unidadeTransporte.get('idinfunidcarga').value) {
        control.removeAt(
          control.getRawValue().findIndex(x => x.idinfunidtransp ===
            unidadeTransporte.get('idinfunidtransp').value));
      } else {
        control.removeAt(
          control.getRawValue().findIndex(x => x.idunidadeauxiliar ===
            unidadeTransporte.get('idunidadeauxiliar').value));
      }
    }
  }

  getTipoUnidadeTransporte(tipoUnidade: string) {
    switch (tipoUnidade) {
      case '1':
        return 'Rodoviário Tração';
        break;
      case '2':
        return 'Rodoviário Reboque';
        break;
      case '3':
        return 'Navio';
        break;
      case '4':
        return 'Balsa';
        break;
      case '5':
        return 'Aeronave';
        break;
      case '6':
        return 'Vagão';
        break;
      case '7':
        return 'Outros';
        break;
    }
  }

  unidadeTransporteValida(unidadeTransporte: any) {
    if (this.tipoUnidadeTransporteInvalido(unidadeTransporte)) {
      return false;
    }
    if (this.identificacaoUnidadeTransporteInvalido(unidadeTransporte)) {
      return false;
    }
    return true;
  }

  tipoUnidadeTransporteInvalido(unidadeTransporte: any) {
    if (!unidadeTransporte.get('tpunidtransp').value) {
      return true;
    }
    return false;
  }

  identificacaoUnidadeTransporteInvalido(unidadeTransporte: any) {
    if (!unidadeTransporte.get('idunidtransp').value) {
      return true;
    }
    return false;
  }
}

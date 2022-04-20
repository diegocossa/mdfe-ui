import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalFormularioUnidadeCargaComponent } from '../../unidade-carga/modal-formulario-unidade-carga/modal-formulario-unidade-carga.component';
import { MDFeUtils } from '../../../../../mdfe-utils';

export class ModalDocumentoData {
  unidadeTransporte: FormGroup;
}

@Component({
  selector: 'app-formulario-unidade-transporte',
  templateUrl: './modal-formulario-unidade-transporte.component.html',
  styleUrls: ['./modal-formulario-unidade-transporte.component.scss']
})
export class ModalFormularioUnidadeTransporteComponent implements OnInit {
  data: ModalDocumentoData;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  idUnidadeTemporaria = 0;

  mdfeUtils = new MDFeUtils();

  tiposUnidade = [
    {label: 'Rodoviário Tração', value: '1'},
    {label: 'Rodoviário Reboque', value: '2'},
    {label: 'Navio', value: '3'},
    {label: 'Balsa', value: '4'},
    {label: 'Aeronave', value: '5'},
    {label: 'Vagão', value: '6'},
    {label: 'Outros', value: '7'},
  ];

  ngOnInit() {
  }

  adicionarUnidadeCarga() {
    if (!this.data.unidadeTransporte.get('infunidcargalist').value) {
      this.data.unidadeTransporte.get('infunidcargalist').setValue([]);
    }

    const unidadeCarga = this.mdfeUtils.getUnidadeCargaForm();
    unidadeCarga.get('idunidadeauxiliar').setValue(this.idUnidadeTemporaria++);

    const control = this.data.unidadeTransporte.get('infunidcargalist') as FormArray;
    control.push(unidadeCarga);

    this.abrirModalUnidadeCarga(unidadeCarga);
  }

  abrirModalUnidadeCarga(unidadeCarga) {
    const dialogReference = this.modalService.open(ModalFormularioUnidadeCargaComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      unidadeCarga
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

  getTipoUnidadeCarga(tipoUnidade: string) {
    switch (tipoUnidade) {
      case '1':
        return 'Container';
        break;
      case '2':
        return 'ULD';
        break;
      case '3':
        return 'Pallet';
        break;
      case '4':
        return 'Outros';
        break;
    }
  }

  removerUnidade(unidadeCarga: any) {
    const control = this.data.unidadeTransporte.get('infunidcargalist') as FormArray;
    if (unidadeCarga === null) {
      control.removeAt(
        control.getRawValue().findIndex(x => !x.tpunidcarga));
    } else {
      if (unidadeCarga.get('idinfunidcarga') && unidadeCarga.get('idinfunidcarga').value) {
        control.removeAt(
          control.getRawValue().findIndex(x => x.idinfunidcarga ===
            unidadeCarga.get('idinfunidcarga').value));
      } else {
        control.removeAt(
          control.getRawValue().findIndex(x => x.idunidadeauxiliar ===
            unidadeCarga.get('idunidadeauxiliar').value));
      }
    }
  }

  salvarUnidadeTransporte() {
    this.activeModal.close({unidadeTransporte: this.data.unidadeTransporte});
  }

  unidadeCargaValida(unidadeCarga: any) {
    if (this.tipoUnidadeCargaInvalido(unidadeCarga)) {
      return false;
    }
    if (this.identificacaoUnidadeCargaInvalido(unidadeCarga)) {
      return false;
    }
    return true;
  }

  tipoUnidadeCargaInvalido(unidadeCarga: any) {
    if (!unidadeCarga.get('tpunidcarga').value) {
      return true;
    }
    return false;
  }

  identificacaoUnidadeCargaInvalido(unidadeCarga: any) {
    if (!unidadeCarga.get('idunidcarga').value) {
      return true;
    }
    return false;
  }

}

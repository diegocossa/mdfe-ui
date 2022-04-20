import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMunicipioDescargaMdfeComponent } from './modal-municipio-descarga-mdfe/modal-municipio-descarga-mdfe.component';
import { UF } from '../../../../../../../shared/services/util/ibge.service';
import { MDFeUtils } from '../../../../mdfe-utils';

@Component({
  selector: 'app-list-municipio-descarga-mdfe',
  templateUrl: './list-municipio-descarga-mdfe.component.html',
  styleUrls: ['./list-municipio-descarga-mdfe.component.scss']
})
export class ListMunicipioDescargaMdfeComponent implements OnInit {

  @Input() infmundescargalist: FormArray;
  @Input() ufDescarregamento: UF;

  idMunicipioTemporario = 0;

  mdfeUtils = new MDFeUtils();

  municipios = [];

  constructor(private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  adicionarMunicipioDescarga() {
    const municipioDescarga = this.mdfeUtils.getMunicipioDescargaForm();
    municipioDescarga.get('idmunicipiodescargaauxiliar').setValue(this.idMunicipioTemporario++);

    this.infmundescargalist.push(municipioDescarga);

    this.abrirModalMunicipioDescarga(municipioDescarga);
  }

  removerMunicipioDescarga(munDescarga: any) {
    if (munDescarga.get('idmunicipiodescargaauxiliar').value) {
      this.infmundescargalist.removeAt(this.infmundescargalist.getRawValue().findIndex(
        x => x.idmunicipiodescargaauxiliar === munDescarga.get('idmunicipiodescargaauxiliar').value));
    } else {
      this.infmundescargalist.removeAt(this.infmundescargalist.getRawValue().findIndex(
        x => x.idinfmundescarga === munDescarga.get('idinfmundescarga').value));
    }
  }

  validarMunicipioDescarga(munDescarga: any) {
    return true;
  }

  abrirModalMunicipioDescarga(municipioDescarga: any) {
    const dialogReference = this.modalService.open(ModalMunicipioDescargaMdfeComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      municipioDescarga,
      ufDescarregamento: this.ufDescarregamento
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

}

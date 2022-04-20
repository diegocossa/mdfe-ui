import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {MDFeUtils} from "../../../../mdfe-utils";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalPericulosidadeComponent} from "./modal-periculosidade/modal-periculosidade.component";

@Component({
  selector: 'app-periculosidade',
  templateUrl: './periculosidade.component.html',
  styleUrls: ['./periculosidade.component.scss']
})
export class PericulosidadeComponent implements OnInit {

  @Input() periculosidadelist: FormArray;

  idPericulosidadeTemporaria = 0;

  mdfeUtils = new MDFeUtils();

  constructor(private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  adicionarPericulosidade() {
    const periculosidade = this.mdfeUtils.getPericulosidadeForm();
    periculosidade.get('idpericulosidadeauxiliar').setValue(this.idPericulosidadeTemporaria++);

    this.periculosidadelist.push(periculosidade);

    this.abrirModalPericulosidade(periculosidade);
  }

  removerMunicipioDescarga(periculosidade: any) {
    if (periculosidade.get('idpericulosidadeauxiliar').value) {
      this.periculosidadelist.removeAt(this.periculosidadelist.getRawValue().findIndex(
        x => x.idmunicipiodescargaauxiliar === periculosidade.get('idpericulosidadeauxiliar').value));
    } else {
      this.periculosidadelist.removeAt(this.periculosidadelist.getRawValue().findIndex(
        x => x.idpericulosidade === periculosidade.get('idpericulosidade').value));
    }
  }

  abrirModalPericulosidade(periculosidade: any) {
    const dialogReference = this.modalService.open(ModalPericulosidadeComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.componentInstance.data = {
      periculosidade
    };

    dialogReference.result
      .then((result) => {

      }).catch((reject) => {

    });
  }

}

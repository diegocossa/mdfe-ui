import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBGEService, UF } from '../../../../../../../../shared/services/util/ibge.service';
import { ErrorHandlerService } from '../../../../../../../../shared/services/util/error-handler.service';

export class ModalMunicipioDescargaData {
  municipioDescarga: FormGroup;
  ufDescarregamento: string;
}

@Component({
  selector: 'app-modal-municipio-descarga-mdfe',
  templateUrl: './modal-municipio-descarga-mdfe.component.html',
  styleUrls: ['./modal-municipio-descarga-mdfe.component.scss']
})
export class ModalMunicipioDescargaMdfeComponent implements OnInit, AfterViewInit {
  data: ModalMunicipioDescargaData;

  constructor(public activeModal: NgbActiveModal,
              private ibgeService: IBGEService,
              private errorHandler: ErrorHandlerService) {
  }

  municipios = [];

  ufDescarregamento: UF;

  munDescargaSelecionado: any;

  ufs = [];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.carregarMunicipiosDescarregamento();
    this.checarMunicipioDescarga();
  }

  carregarMunicipiosDescarregamento() {
    this.ibgeService.getUFs()
      .then(response => {
        this.ufDescarregamento = response[response.findIndex(x => x.sigla === this.data.ufDescarregamento)];
        this.ibgeService.getMunicipios(this.ufDescarregamento.id)
          .then(res => {
            this.municipios = [];
            this.municipios = res;
          })
          .catch(error => {
            this.errorHandler.show(error);
          });
      })
      .catch(error => {
        this.errorHandler.show(error);
      });
  }

  checarMunicipioDescarga() {
    if (this.data.municipioDescarga.get('cmundescarga').value) {
      this.ibgeService.getMunicipioById(this.data.municipioDescarga.get('cmundescarga').value)
        .then(municipio => {
          this.munDescargaSelecionado = municipio;
          this.atualizarMun(municipio);
        })
        .catch(response => {
        });
    }
  }

  atualizarMun(municipio: any) {
    this.data.municipioDescarga.get('cmundescarga').setValue(municipio.id);
    this.data.municipioDescarga.get('xmundescarga').setValue(municipio.nome);
  }

  salvarMunicipioDescarga() {
    this.atualizarValidacoes();
    this.activeModal.close({municipioDescarga: this.data.municipioDescarga});
  }

  fecharModal() {
    this.atualizarValidacoes();
    this.activeModal.dismiss({municipioDescarga: this.data.municipioDescarga});
  }

  atualizarValidacoes() {
    this.data.municipioDescarga.get('cmundescarga').updateValueAndValidity();
    this.data.municipioDescarga.get('xmundescarga').updateValueAndValidity();
    this.data.municipioDescarga.get('infdoclist').updateValueAndValidity();
  }

}

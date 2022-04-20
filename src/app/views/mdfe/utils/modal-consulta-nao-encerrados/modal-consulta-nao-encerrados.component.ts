import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EncerrarManifestoComponent} from "../../eventos/encerrar-manifesto/encerrar-manifesto.component";
import {EncerramentoMDFe, MdfeService} from "../../../../shared/services/mdfe/mdfe.service";
import {ToastService} from "../../../../shared/services/util/toast.service";
import {ErrorHandlerService} from "../../../../shared/services/util/error-handler.service";

export class ModalConsultaNaoEncerradosData {
  listMdfeNaoEncerrados: any;
}

@Component({
  selector: 'app-modal-consulta-nao-encerrados',
  templateUrl: './modal-consulta-nao-encerrados.component.html',
  styleUrls: ['./modal-consulta-nao-encerrados.component.scss']
})
export class ModalConsultaNaoEncerradosComponent implements OnInit {
  data: ModalConsultaNaoEncerradosData;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private mdfeService: MdfeService,
              private toastService: ToastService,
              private errorHandler: ErrorHandlerService) {}

  ngOnInit() {}

  fecharModal() {
    this.activeModal.dismiss();
  }

  encerrarManifesto(chave: string, protocolo: string) {
    const dialogReference = this.modalService.open(EncerrarManifestoComponent,
      {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});

    dialogReference.result
      .then((result) => {
        const encerramentoMdfe = new EncerramentoMDFe();
        encerramentoMdfe.chave = chave;
        encerramentoMdfe.numprotocolo = protocolo;
        encerramentoMdfe.codigomunicipio = result.formEncerramento.codigomunicipio;
        encerramentoMdfe.uf = result.formEncerramento.uf;

        this.mdfeService.encerrarPelaChave(encerramentoMdfe).then(response => {
          if (response.Status == '135') {
            this.data.listMdfeNaoEncerrados.splice(
              this.data.listMdfeNaoEncerrados.findIndex(x => x.chave == chave), 1
            );
            this.toastService.success('Manifesto encerrado com sucesso.');
          } else {
            this.toastService.warning(`O manifesto não foi encerrado corretamente, verifique o status ${response.Status} na SEFAZ.`);
          }
        })
          .catch(error => {
            this.errorHandler.show(error);
          })
      }).catch((reject) => {

    });
  }

}

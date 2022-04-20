import { Component, OnInit } from '@angular/core';
import { CertificadoService } from '../../../shared/services/certificado/certificado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../shared/services/util/toast.service';
import { Certificado } from '../../../shared/models/certificado/certificado';
import { RemoveConfirmModalComponent } from '../../../shared/components/util/remove-confirm-modal/remove-confirm-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-certificado-pesquisa',
  templateUrl: './certificado-pesquisa.component.html',
  styleUrls: ['./certificado-pesquisa.component.scss']
})
export class CertificadoPesquisaComponent implements OnInit {

  constructor(private certificadoService: CertificadoService,
              private activatedRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private dialog: NgbModal,
              private toast: ToastService,
              public router: Router) {
    this.title.setTitle('3G Brasil - Certificado - Pesquisa');
  }

  idempresa: number;
  certificado = new Certificado();

  ngOnInit() {
    this.idempresa = this.activatedRoute.snapshot.params.id;
    if (this.idempresa) {
      this.carregarCertificado(this.idempresa);
    } else {
      this.errorHandler.show('Parece que houve algum problema com a rota de certificados, tente novamente.');
    }
  }

  excluir() {
    const dialogReference = this.dialog.open(RemoveConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    dialogReference.componentInstance.data = {
      modalTitle: 'Remover Certificado',
      objectToRemoveName: 'Certificado Digital'
    };

    dialogReference.result
      .then((result) => {
        if (result) {
          this.certificadoService.deleteCertificado(this.certificado.idcertificado)
            .then(() => {
              this.toast.success('Certificado deletado com sucesso.');
              this.carregarCertificado(this.idempresa);
            })
            .catch(err => this.errorHandler.show(err));
        }
      }).catch(() => null);
  }

  carregarCertificado(idempresa: number) {
    this.certificadoService.findByIdEmpresa(idempresa)
      .then(response => {
        console.log(response);
        this.certificado = response;
      })
      .catch(err => {
        this.errorHandler.show(err);
      });
  }

  get certificadoValido() {
    if (!this.certificado) {
      return false;
    }
    if (this.certificado.arquivo) {
      if (moment(this.certificado.dtfimvalidade).isAfter(moment.now())) {
        return true;
      }
    }
    return false;
  }
}

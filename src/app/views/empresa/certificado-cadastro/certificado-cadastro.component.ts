import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../shared/services/util/error-handler.service';
import { ToastService } from '../../../shared/services/util/toast.service';
import { CertificadoService } from '../../../shared/services/certificado/certificado.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-certificado-cadastro',
  templateUrl: './certificado-cadastro.component.html',
  styleUrls: ['./certificado-cadastro.component.scss']
})
export class CertificadoCadastroComponent implements OnInit {

  constructor(private title: Title,
              private activatedRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private toast: ToastService,
              private certificadoService: CertificadoService,
              private fb: FormBuilder) {
  }

  isSubmited = false;

  certificadoForm = this.fb.group({
    idcertificado: [null],
    senha: [null, Validators.compose([
      Validators.required, Validators.maxLength(100)
    ])],
    arquivo: [null, Validators.required]
  });

  get editing() {
    return Boolean(this.certificadoForm.get('idcertificado').value);
  }

  certificado: File;
  idempresa: number;

  onSubmit() {
    this.isSubmited = true;
    const formData = new FormData();
    formData.append('file', this.certificado);
    formData.append('senha', this.certificadoForm.get('senha').value);

    this.certificadoService.save(formData, this.idempresa)
      .then(() => {
        this.toast.success('Certificado digital cadastrado com sucesso.');
        this.router.navigate(['/empresa/certificado/pesquisa', this.idempresa]);
      })
      .catch(err => {
        this.errorHandler.show(err);
        this.isSubmited = false;
      });
  }

  ngOnInit() {
    this.idempresa = this.activatedRoute.snapshot.params.id;
    this.certificadoForm.get('arquivo').disable();
  }

  openInput() {
    document.getElementById('fileInput').click();
  }

  fileChange(files: File[]) {
    const arquivo: File = files[0];

    if (arquivo.type !== 'application/x-pkcs12') {
      this.toast.warning('O arquivo que você escolheu tem um formato estranho.');
    }
    this.certificadoForm.get('arquivo').setValue(arquivo.name);
    this.certificado = arquivo;
  }

}

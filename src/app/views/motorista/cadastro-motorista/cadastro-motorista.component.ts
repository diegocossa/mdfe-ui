import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MotoristaService} from '../../../shared/services/motorista/motorista.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../shared/services/util/toast.service';
import {ErrorHandlerService} from '../../../shared/services/util/error-handler.service';
import {RegularExpression} from "../../../core/consts/regular-expression-sefaz";

@Component({
  selector: 'app-cadastro-motorista',
  templateUrl: './cadastro-motorista.component.html',
  styleUrls: ['./cadastro-motorista.component.scss']
})
export class CadastroMotoristaComponent implements OnInit {
  isSubmited = false;

  maxLength = {
    nome: 60,
    cpf: 11,
    telefone: 20,
    observacao: 200
  };

  minLength = {
    cpf: 11
  };

  motoristaForm = this.fb.group({
    idmotorista: [null],
    nome: [null, Validators.compose([
      Validators.required, Validators.maxLength(this.maxLength.nome), Validators.pattern(RegularExpression.ER35)
    ])],
    cpf: [null, Validators.compose([
      Validators.required, Validators.minLength(this.minLength.cpf), Validators.maxLength(this.maxLength.cpf),
      Validators.pattern(RegularExpression.ER10)
    ])],
    senhamotorista: [null],
    telefone: [null, Validators.compose([
      Validators.pattern(RegularExpression.ER46), Validators.maxLength(this.maxLength.telefone)
    ])],
    observacao: [null, Validators.maxLength(this.maxLength.observacao)],
    flagativo: [true]
  });

  get editing() {
    return Boolean(this.motoristaForm.get('idmotorista').value);
  }

  constructor(private fb: FormBuilder,
              private title: Title,
              private motoristaService: MotoristaService,
              private router: Router,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) {
    this.title.setTitle('Motoristas');
  }

  ngOnInit() {
    this.checarParametrosRota();
  }

  checarParametrosRota() {
    const idmotorista = this.activatedRoute.snapshot.params.id;
    if (idmotorista) {
      this.carregarMotorista(idmotorista);
    }
  }

  carregarMotorista(idmotorista: number) {
    this.motoristaService.findById(idmotorista)
      .then(response => {
        this.motoristaForm.patchValue(response);
      }).catch(err => this.errorHandler.show(err));
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.editing) {
      this.motoristaService.update(this.motoristaForm.value)
        .then(() => {
          this.toast.success('Motorista editado com sucesso.');
          this.router.navigate(['/motorista']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    } else {
      this.motoristaService.save(this.motoristaForm.value)
        .then(() => {
          this.toast.success('Motorista cadastrado com sucesso.');
          this.router.navigate(['/motorista']);
        })
        .catch(err => {
          this.errorHandler.show(err);
          this.isSubmited = false;
        });
    }
  }
}

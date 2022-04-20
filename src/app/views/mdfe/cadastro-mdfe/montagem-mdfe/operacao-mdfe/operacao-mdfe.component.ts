import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Condutor } from '../../../../../shared/models/mdfe/condutor';
import { IBGEService, Municipio, UF } from '../../../../../shared/services/util/ibge.service';
import { InfPercurso } from '../../../../../shared/models/mdfe/inf-percurso';
import { InfMunCarrega } from '../../../../../shared/models/mdfe/inf-mun-carrega';
import { Veiculo } from '../../../../../shared/models/veiculo/veiculo';
import { VeiculoReboque } from '../../../../../shared/models/mdfe/veiculo-reboque';
import { FormBuilder } from '@angular/forms';
import { MotoristaService } from '../../../../../shared/services/motorista/motorista.service';
import { VeiculoService } from '../../../../../shared/services/veiculo/veiculo.service';
import { ErrorHandlerService, StackErrorEnum } from '../../../../../shared/services/util/error-handler.service';
import { MDFeUtils } from '../../mdfe-utils';

@Component({
  selector: 'app-operacao-mdfe',
  templateUrl: './operacao-mdfe.component.html',
  styleUrls: ['./operacao-mdfe.component.scss']
})
export class OperacaoMdfeComponent implements OnInit, AfterViewInit {

  @Input() mdfeForm;

  motoristas: Array<Condutor>;

  mdfeUtils = new MDFeUtils();

  UFs: Array<UF>;
  UFsPercurso: Array<InfPercurso>;
  municipiosCarregamento: Array<InfMunCarrega>;
  municipiosDescarregamento: Array<Municipio>;

  tracoes: Array<Veiculo>;
  reboques: Array<VeiculoReboque>;

  constructor(private fb: FormBuilder,
              private motoristaService: MotoristaService,
              private veiculoService: VeiculoService,
              private errorHandler: ErrorHandlerService,
              private ibgeService: IBGEService) {
  }

  ngOnInit() {
    this.carregarMotoristas();
    this.carregarUFs();
    this.carregarTracoes();
    this.carregarReboques();
  }

  carregarMotoristas() {
    this.motoristaService.findCondutores()
      .then(response => {
        this.motoristas = response;
      })
      .catch(err => {
        this.errorHandler.show(err, StackErrorEnum.MANIFESTO);
      });
  }

  carregarUFs() {
    this.ibgeService.getUFs()
      .then(response => {
        this.UFs = response;
        const arrayPercurso = new Array<InfPercurso>();
        this.UFs.forEach(x => {
          arrayPercurso.push({ufper: x.sigla, nome: x.nome});
        });
        this.UFsPercurso = arrayPercurso;
      })
      .catch(err => {
        this.errorHandler.show(err, StackErrorEnum.MANIFESTO);
      });
  }

  carregarMunicipiosCarregamento(evento: any) {
    this.mdfeForm.get('infmuncarregalist').reset();
    this.ibgeService.getMunicipios(evento.id)
      .then(response => {
        const municipioCarregamento = new Array<InfMunCarrega>();
        response.forEach(x => {
          municipioCarregamento.push({xmuncarrega: x.nome, cmuncarrega: x.id.toString()});
        });
        this.municipiosCarregamento = municipioCarregamento;
      })
      .catch(err => {
        this.errorHandler.show(err, StackErrorEnum.MANIFESTO);
      });
  }

  carregarMunicipiosDescarregamento(evento: any) {
    this.ibgeService.getMunicipios(evento.id)
      .then(response => {
        this.municipiosDescarregamento = response;
      })
      .catch(err => {

      });
  }

  carregarTracoes() {
    this.veiculoService.findTracoes()
      .then(response => {
        this.tracoes = response;
      })
      .catch(err => {

      });
  }

  carregarReboques() {
    this.veiculoService.findVeiculoReboque()
      .then(response => {
        this.reboques = response;
      })
      .catch(err => {

      });
  }

  ngAfterViewInit() {
    console.log(this.mdfeForm.value);
  }

}

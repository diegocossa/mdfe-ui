import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RegularExpression} from "../../../core/consts/regular-expression-sefaz";

export class MDFeUtils {
  formBuilder = new FormBuilder();

  getAutorizadosXMLForm(): FormGroup {
    return this.formBuilder.group({
      idautorizadotemporario: [null],
      idautorizadosxml: [null],
      cpf: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER10)
      ])],
      cnpj: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER7)
      ])]
    });
  }

  getCiotForm(): FormGroup {
    return this.formBuilder.group({
      idciottemporario: [null],
      idinfciot: [null],
      ciot: [null, Validators.compose([
        Validators.required, Validators.pattern(RegularExpression.ER56)
      ])],
      cpf: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER10)
      ])],
      cnpj: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER9)
      ])]
    });
  }

  getValePedagioForm(): FormGroup {
    return this.formBuilder.group({
      idvaletemporario: [null],
      idvalepedagio: [null],
      cnpjforn: [null, Validators.compose([
        Validators.required, Validators.pattern(RegularExpression.ER7)
      ])],
      cnpjpg: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER9)
      ])],
      cpfpg: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER10)
      ])],
      ncompra: [null, Validators.compose([
        Validators.required, Validators.pattern(RegularExpression.ER57)
      ])],
      vvaleped: [null, Validators.compose([
        Validators.required, Validators.pattern(RegularExpression.ER27)
      ])]
    });
  }

  getInformacoesContratanteForm(): FormGroup {
    return this.formBuilder.group({
      idinfcontratantetemporario: [null],
      idinfcontratante: [null],
      cpf: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER10)
      ])],
      cnpj: [null, Validators.compose([
        Validators.pattern(RegularExpression.ER9)
      ])]
    });
  }

  getSeguradoraForm(): FormGroup {
    return this.formBuilder.group({
      idseguradoratemporario: [null],
      idseg: [null],
      seguradora: [null, Validators.required],
      segnumeroaverbacaolist: [null, Validators.pattern(RegularExpression.ER35)]
    });
  }

  getMunicipioDescargaForm(): FormGroup {
    return this.formBuilder.group({
      idmunicipiodescargaauxiliar: [null],
      idinfmundescarga: [null],
      cmundescarga: [null, Validators.required],
      xmundescarga: [null, Validators.required],
      infdoclist: this.formBuilder.array([])
    });
  }

  getPericulosidadeForm(): FormGroup {
    return this.formBuilder.group({
      idpericulosidadeauxiliar: [null],
      idpericulosidade: [null],
      gremb: [null, Validators.compose([
        Validators.minLength(1), Validators.maxLength(6), Validators.pattern(RegularExpression.ER35)
      ])],
      nonu: [null, Validators.compose([
        Validators.minLength(4), Validators.maxLength(4), Validators.required,
        Validators.pattern(RegularExpression.ER44)
      ])],
      qtotprod: [null, Validators.compose([
        Validators.minLength(1), Validators.maxLength(20), Validators.required, Validators.pattern(RegularExpression.ER35)
      ])],
      qvoltipo: [null, Validators.compose([
        Validators.minLength(1), Validators.maxLength(60), Validators.pattern(RegularExpression.ER35)
      ])],
      xclarisco: [null, Validators.compose([
        Validators.minLength(1), Validators.maxLength(40), Validators.pattern(RegularExpression.ER35)
      ])],
      xnomeae: [null, Validators.compose([
        Validators.minLength(1), Validators.maxLength(150), Validators.pattern(RegularExpression.ER35)
      ])]
    });
  }

  getDocumentoForm(): FormGroup {
    return this.formBuilder.group({
      iddocumentoauxiliar: [null],
      idinfdoc: [null],
      chavedoc: [null, Validators.compose([
        Validators.required, Validators.minLength(44), Validators.maxLength(44), Validators.pattern(RegularExpression.ER3)
      ])],
      tipodoc: [null],
      segcodbarra: [null, Validators.compose([Validators.minLength(36), Validators.maxLength(36), Validators.pattern(RegularExpression.ER4)])],
      peso: [null, Validators.required],
      valor: [null, Validators.required],

      infunidtransplist: this.formBuilder.array([]),
      periculosidadelist: this.formBuilder.array([]),
    });
  }

  getUnidadeTransporteForm(): FormGroup {
    return this.formBuilder.group({
      idunidadeauxiliar: [null],
      tpunidtransp: [null, Validators.required],
      idunidtransp: [null, Validators.compose([
        Validators.required, Validators.pattern(RegularExpression.ER54)
      ])],
      qtdrateada: [null, Validators.pattern(RegularExpression.ER15)],
      lacreunidtransplist: [null],
      infunidcargalist: this.formBuilder.array([])
    });
  }

  getUnidadeCargaForm(): FormGroup {
    return this.formBuilder.group({
      idunidadeauxiliar: [null],
      idinfunidcarga: [null],
      tpunidcarga: [null, Validators.required],
      idunidcarga: [null, Validators.compose([
        Validators.required, Validators.pattern(RegularExpression.ER54)
      ])],
      qtdrateada: [null, Validators.pattern(RegularExpression.ER15)],
      lacreunidcargalist: [null, Validators.pattern(RegularExpression.ER35)]
    });
  }

  getUFBySigla(sigla: string): any {
    switch (sigla) {
      case 'AC':
        return 'Acre';

      case 'AL':
        return 'Alagoas';

      case 'AP':
        return 'Amapá';

      case 'AM':
        return 'Amazonas';

      case 'BA':
        return 'Bahia';

      case 'CE':
        return 'Ceará';

      case 'DF':
        return 'Distrito Federal';

      case 'ES':
        return 'Espírito Santo';

      case 'GO':
        return 'Goiás';

      case 'MA':
        return 'Maranhão';

      case 'MT':
        return 'Mato Grosso';

      case 'MS':
        return 'Mato Grosso do Sul';

      case 'MG':
        return 'Minas Gerais';

      case 'PA':
        return 'Pará';

      case 'PB':
        return 'Paraíba';

      case 'PR':
        return 'Paraná';

      case 'PE':
        return 'Pernambuco';

      case 'PI':
        return 'Piauí';

      case 'RJ':
        return 'Rio de Janeiro';

      case 'RN':
        return 'Rio Grande do Norte';

      case 'RS':
        return 'Rio Grande do Sul';

      case 'RO':
        return 'Rondônia';

      case 'RR':
        return 'Roraima';

      case 'SC':
        return 'Santa Catarina';

      case 'SP':
        return 'São Paulo';

      case 'SE':
        return 'Sergipe';

      case 'TO':
        return 'Tocantins';
    }
  }
}

import { Proprietario } from './proprietario';

export class Veiculo {
  idveiculo: number;
  placa: string;
  renavam: string;
  capacidadem3: string;
  veiculotipo: string;
  tiporodado: string;
  uf: string;
  capacidadekg: string;
  tara: string;
  tipocarroceria: string;
  tipopropriedade: string;
  observacao: string;
  proprietario = new Proprietario();
  flagdel: boolean;
}

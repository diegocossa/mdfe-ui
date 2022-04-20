import { InfUnidTransp } from './inf-unid-transp';
import { Periculosidade } from './periculosidade';

export class InfDoc {
  idinfdoc: number;
  chavedoc: string;
  tipodoc: string;
  segcodbarra: string;
  peso: number;
  valor: number;

  infunidtransplist: Array<InfUnidTransp>;
  periculosidadelist: Array<Periculosidade>;
}

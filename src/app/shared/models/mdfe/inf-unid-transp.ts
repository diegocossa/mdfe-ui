import { LacreUnidTransp } from './lacre-unid-transp';
import { InfUnidCarga } from './inf-unid-carga';

export class InfUnidTransp {
  idinfunidtransp: number;

  tpunidtransp: string;
  idunidtransp: string;
  qtdrateada: number;

  lacreunidtransplist: Array<LacreUnidTransp>;
  infunidcargalist: Array<InfUnidCarga>;
}

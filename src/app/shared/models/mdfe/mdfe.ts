import { Veiculo } from '../veiculo/veiculo';
import { InfMunCarrega } from './inf-mun-carrega';
import { InfPercurso } from './inf-percurso';
import { InfMunDescarga } from './inf-mun-descarga';
import { Seg } from './seg';
import { Totalizadores } from './totalizadores';
import { Lacre } from './lacre';
import { AutorizadosXml } from './autorizados-xml';
import { InfCiot } from './inf-ciot';
import { ValePedagio } from './vale-pedagio';
import { InfContratante } from './inf-contratante';
import { Condutor } from './condutor';
import { LacreRodoviario } from './lacre-rodoviario';
import { VeiculoReboque } from './veiculo-reboque';

export class MDFe {
  idmdfe: number;
  idlote: string;
  chave: string;
  numrecibo: string;
  numprotocolo: string;
  ambienteenvio: string;
  statusenvio: string;
  statusmdfe: string;
  motivoenvio: string;
  ambienterecibo: string;
  statusrecibo: string;
  motivorecibo: string;
  retornorecibo: string;
  serie: number;
  nmdf: string;
  cmdf: string;
  cdv: string;
  indcarregaposterior: boolean;

  dhemi: Date;
  dhiniviagem: Date;

  ufini: string;
  uffim: string;

  infadfisco: string;
  infcpl: string;

  veiculotracao: Veiculo;

  situacao: string;

  infmuncarregalist: Array<InfMunCarrega>;
  infpercursolist: Array<InfPercurso>;
  infmundescargalist: Array<InfMunDescarga>;

  seglist: Array<Seg>;
  totalizadores: Totalizadores;
  lacrelist: Array<Lacre>;
  autorizadosxmllist: Array<AutorizadosXml>;
  infciotlist: Array<InfCiot>;
  valepedagiolist: Array<ValePedagio>;
  infcontratantelist: Array<InfContratante>;
  condutorlist: Array<Condutor>;
  lacrerodoviariolist: Array<LacreRodoviario>;
  veiculoreboquelist: Array<VeiculoReboque>;
}

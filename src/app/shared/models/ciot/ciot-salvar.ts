import { Motorista } from '../motorista/motorista';
import { Empresa } from '../empresa/empresa';

export class CiotSalvar {
  idciot: number;
  ciot: string;
  motorista: Motorista;
  empresa: Empresa;
  flagdel: boolean;
}

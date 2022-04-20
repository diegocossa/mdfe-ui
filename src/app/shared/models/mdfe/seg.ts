import { Seguradora } from '../seguradora/seguradora';
import { SegNumeroAverbacao } from './seg-numero-averbacao';

export class Seg {
  idseg: number;
  seguradora: Seguradora;
  segnumeroaverbacaolist: Array<SegNumeroAverbacao>;
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'telefone'})
export class TelefonePipe implements PipeTransform {

  transform(value: any): any {
    if (!(typeof value === 'string')) {
      return value;
    } else if (!(value.toString().trim().length > 0)) {
      return '';
    } else if (value && value.length === 10) {
      return `(${value.substr(0, 2)}) ${value.substr(2, 4)}-${value.substr(6, 4)}`;
    } else if (value && value.length === 11) {
      return `(${value.substr(0, 2)}) ${value.substr(2, 1)} ${value.substr(3, 4)}-${value.substr(7, 4)}`;
    } else {
      return value;
    }
  }
}



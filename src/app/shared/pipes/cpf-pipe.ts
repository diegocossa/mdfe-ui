import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cpf'})
export class CPFPipe implements PipeTransform {

  transform(value) {
    return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`;
  }

}


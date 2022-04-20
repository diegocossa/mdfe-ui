import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat
  },
  {
    error: 'requiredSenhasIguais',
    format: requiredSenhasIguaisFormat
  }, {
    error: 'email',
    format: emailFormat
  }, {
    error: 'minlength',
    format: minLengthFormat
  }, {
    error: 'maxlength',
    format: maxLengthValue
  }, {
    error: 'pattern',
    format: patternFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `${label} é obrigatório(a)!`;
}

export function maxLengthValue(label: string, error: any): string {
  return `Só pode haver no máximo ${error.requiredLength} ${label}!`;
}

export function requiredSenhasIguaisFormat(label: string, error: any): string {
  return `A senha e a confirmação da senha devem ser iguais!`;
}

export function emailFormat(label: string, error: any): string {
  return `Isso não parece ser um e-mail válido.`;
}

export function minLengthFormat(label: string, error: any): string {
  return `O campo ${label} precisa ter no mínimo ${error.requiredLength}.`;
}

export function patternFormat(label: string, error: any): string {
  return `O campo ${label} não está válido!`;
}

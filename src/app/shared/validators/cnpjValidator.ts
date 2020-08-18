import { AbstractControl } from '@angular/forms';
import { isValidCNPJ } from '@brazilian-utils/brazilian-utils';

export function cnpjValidator(control: AbstractControl) {
    const cnpj = control.value;
    if (cnpj && (isValidCNPJ(cnpj))) {
        return true;
    }
    return false;
}

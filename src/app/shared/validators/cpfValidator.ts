import { AbstractControl } from '@angular/forms';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';

export function cpfValidator(control: AbstractControl) {
    const cpf = control.value;
    if (cpf && (isValidCPF(cpf))) {
        return true;
    }
    return false;
}

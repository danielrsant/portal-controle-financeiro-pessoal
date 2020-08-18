import { AbstractControl} from '@angular/forms';

export function NonZeroValidator(control: AbstractControl) {
    const nonzero = control.value;
    if (nonzero) {
        if (nonzero != 0){
            return null;
        }
        return { nonzero: true };
    }
}
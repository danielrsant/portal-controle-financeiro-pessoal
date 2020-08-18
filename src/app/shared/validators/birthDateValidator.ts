import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function BirthDateValidator(control: AbstractControl) {
    const birthDate = moment(control.value).format('YYYY-MM-DD');
    if (birthDate && (birthDate < moment().format('YYYY-MM-DD'))) {
        return null;
    }
    return { birthDate: true };
}

import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function DateValidityValidator(control: AbstractControl) {
    const dateValidity = moment(control.value).format('YYYY-MM-DD');
    if (dateValidity && (dateValidity > moment().format('YYYY-MM-DD'))) {
        return null;
    }
    return { dateValidity: true };
}

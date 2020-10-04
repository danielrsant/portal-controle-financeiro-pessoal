import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  paginatorWasChanged = new EventEmitter<any>();

  constructor(
    private _toastrService: ToastrService
  ) { }

  removeNullUndefinedProperties(payload): any {
    Object.keys(payload).forEach(key => payload[key] === undefined || payload[key] === null ? delete payload[key] : {});
    return payload;
  }

  hasRequiredField(abstractControl: AbstractControl): boolean {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  validateFileImage(file, required?): boolean {
    if (file && typeof file.name == 'string') {
      const mimeType = file.type;
      if (mimeType.match(/image\/png/) || mimeType.match(/image\/jpg/) || mimeType.match(/image\/jpeg/)) {
        return true;
      } else {
        return false;
      }
    } else if (file && typeof file === 'string') {
      return true;
    } else if (required) {
      return false;
    } else {
      return true;
    }

  }

  validateFilePdf(file): boolean {
    const mimeType = file.type;
    if (mimeType.match(/application\/pdf/)) {
      return true;
    } else {
      return false;
    }
  }

  validateFileZip(file): boolean {
    const mimeType = file.type;
    if (mimeType.match(/application\/zip/) || mimeType.match(/application\/x-zip-compressed/)) {
      return true;
    } else {
      return false;
    }
  }

  momentToDate(date): any {
    if (typeof date === 'object') {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    } else {
      return date;
    }
  }

  checkDateIsBefore(date): any {
    return moment(date).isBefore(moment());
  }

}

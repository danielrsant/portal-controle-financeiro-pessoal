import {
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormField } from '../../../interfaces/form-filter.interface';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  form: FormGroup;
  fields: IFormField[] = [];

  constructor(private _dialog: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.fields = data.fields;
    this.generateFormFilter();
  }

  ngOnInit() { }

  generateFormFilter(): void {
    let teste = {};
    this.fields.forEach(field => {
      teste = Object.assign(teste, {
        [field.formcontrolname]: '',
      });
    });

    this.form = this.mapToAbstractControl(teste);
  }

  mapToAbstractControl(data: any): any {
    if (typeof data === 'object') {

      const formGroupDescription = {};
      Object.values(data).forEach((value, index) => {
        if (typeof value !== 'object') {
          formGroupDescription[Object.keys(data)[index]] = this.mapToAbstractControl(data[Object.keys(data)[index]]);
        }
      });

      return new FormGroup(formGroupDescription);

    } else {
      return new FormControl(data);
    }
  }

  complete() {
    this._dialog.close();
  }

  cancel() {

  }

}

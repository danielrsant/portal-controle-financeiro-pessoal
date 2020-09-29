import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IFormField } from '../../../interfaces/form-filter.interface';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  form: FormGroup;
  fields: IFormField[] = [];

  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  constructor(private _dialog: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.fields = data.fields;
    this.generateFormFilter();
  }

  ngOnInit(): void { }

  generateFormFilter(): void {
    let newObj = {};
    this.fields.forEach(field => {
      newObj = Object.assign(newObj, {
        [field.formcontrolname]: '',
      });
    });

    this.form = this.mapToAbstractControl(newObj);
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

  complete(): void {
    this._dialog.close();
  }

  cancel(): void { }

}

import {
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(private _dialg: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.form = data.form;
    this.fields = data.fields;
  }

  ngOnInit() {
    
  }

  complete() {
    this._dialg.close();
  }

  cancel() {

  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StyleService } from 'src/app/shared/services/style.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss']
})
export class InputDatepickerComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string;
  @Input() placeholder: string = 'DD-MM-AAAA';

  @Input() clearOption: boolean = true;

  @Input() min = null;
  @Input() max = null;

  @Input() appearance: string = '';

  minDate = null;
  maxDate = null;

  appearance$: Observable<string>;

  constructor(
    private _utilsService: UtilsService,
    private _styleService: StyleService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._styleService.appearance$;
    this.verifyDate();
  }

  checkRequired(formcontrolname): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(formcontrolname));
  }

  resetField(): void {
    this.formGroup.get(this.formcontrolname).setValue(null);
    this.formGroup.get(this.formcontrolname).markAsUntouched();
  }

  verifyDate(): void {
    if (this.max) {
      if (this.max._i) {
        const finDate = this.max._i;
        this.maxDate = new Date(finDate.year, finDate.month, finDate.date);
      } else {
        this.maxDate = this.max;
      }
    }

    if (this.min) {
      if (this.min._i) {
        const iniDate = this.min._i;
        this.minDate = new Date(iniDate.year, iniDate.month, iniDate.date);
      } else {
        this.minDate = this.min;
      }
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StyleService } from 'src/app/shared/services/style.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-datepicker-range',
  templateUrl: './input-datepicker-range.component.html',
  styleUrls: ['./input-datepicker-range.component.scss']
})
export class InputDatepickerRangeComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolnameStart: string;
  @Input() formcontrolnameEnd: string;

  @Input() label: string;
  @Input() placeholderStart: string = 'Data Inicial';
  @Input() placeholderEnd: string = 'Data Final';

  @Input() clearOption: boolean = true;

  @Input() min = null;
  @Input() max = null;

  @Input() appearance: string = '';

  @Output() clear = new EventEmitter();

  minDate = null;
  maxDate = null;

  appearance$: Observable<string>;

  constructor(
    private _utilsService: UtilsService,
    private _styleService: StyleService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._styleService.appearance$;
   }

  checkRequired(formcontrolnameStart, formcontrolNameEnd): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(formcontrolnameStart)) || this._utilsService.hasRequiredField(this.formGroup.get(formcontrolNameEnd));
  }

  resetField(): void {
    this.clear.emit();
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

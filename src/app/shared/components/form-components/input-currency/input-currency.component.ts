import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StyleService } from 'src/app/shared/services/style.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss']
})
export class InputCurrencyComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() iconName: string;
  @Input() disabled: boolean;
  @Input() appearance: string;

  @Output() changeValue = new EventEmitter();

  appearance$: Observable<string>;

  constructor(
    private _utilsService: UtilsService,
    private _styleService: StyleService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._styleService.appearance$;
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(value: string): void {
    this.changeValue.emit();
  }

  onBlur(): void {
    const input = this.formGroup.get(this.formcontrolname);
    if (input.value) {
      input.setValue(input.value);
    }
  }

}

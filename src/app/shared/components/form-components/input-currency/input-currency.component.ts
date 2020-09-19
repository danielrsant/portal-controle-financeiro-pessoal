import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(
      private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    const input = this.formGroup.get(this.formcontrolname);
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
      input.setValue(input.value.trim());
    }
  }

}

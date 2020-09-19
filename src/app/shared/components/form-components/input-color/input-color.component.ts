import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.scss']
})
export class InputColorComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string;
  @Input() placeholder: string;
  
  @Input() disabled: boolean;

  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(value: string): string {
    if (value.trim() === '') {
      return null;
    } else {
      return value;
    }
  }

  onBlur(): void {
    const input = this.formGroup.get(this.formcontrolname);
    if (input.value) { input.setValue(input.value.trim()); }
  }

}

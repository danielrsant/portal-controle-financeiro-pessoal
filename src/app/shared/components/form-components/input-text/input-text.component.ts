import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomizeInputsService } from 'src/app/shared/services/customize-inputs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string;
  @Input() placeholder: string = 'Digite aqui';

  @Input() iconName: string;
  @Input() maxLength: number = null;

  @Input() appearance: string = '';
  @Input() mask: string;
  @Input() dropSpecialCharacters: boolean = true;

  @Input() autocomplete = 'off';

  appearance$: Observable<string>;

  constructor(
    private _utilsService: UtilsService,
    private _customizeInputsService: CustomizeInputsService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._customizeInputsService.appearance;
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(value) {
    if (this.maxLength && value.length > this.maxLength) {
      value = value.substring(0, (value.length - 1));
    }
    return value;
  }

}

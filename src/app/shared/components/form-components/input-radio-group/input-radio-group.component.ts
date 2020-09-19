import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomizeInputsService } from 'src/app/shared/services/customize-inputs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-radio-group',
  templateUrl: './input-radio-group.component.html',
  styleUrls: ['./input-radio-group.component.scss']
})
export class InputRadioGroupComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() data: Array<any>;

  @Input() label: string;
  @Input() disabled: boolean = false; 

  @Input() valueField: string;
  @Input() displayField: string;

  @Input() layout: 'row' | 'column' = 'row';

  @Input() appearance: string = '';

  appearance$: Observable<string>;

  constructor(
    private _utilsService: UtilsService,
    private _customizeInputsService: CustomizeInputsService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._customizeInputsService.appearance;
  }

  setValue(event): void {
    this.formGroup.get(this.formcontrolname).setValue(event.value);
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}

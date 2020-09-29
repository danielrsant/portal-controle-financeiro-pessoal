import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomizeInputsService } from 'src/app/shared/services/customize-inputs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputToggleComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string;

  @Input() appearance: string = '';

  appearance$: Observable<string>;

  constructor(
    private _utilsService: UtilsService,
    private _customizeInputsService: CustomizeInputsService
  ) { }

  ngOnInit() {
    this.appearance$ = this._customizeInputsService.appearance;
  }

  setValue(value) {
    this.formGroup.get(this.formcontrolname).setValue(value.checked ? 1 : 0);
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}


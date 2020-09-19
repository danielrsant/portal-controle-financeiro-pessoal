import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomizeInputsService } from 'src/app/shared/services/customize-inputs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss']
})
export class InputTextAreaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string;
  @Input() placeholder: string = 'Digite aqui';
  @Input() maxLength: number;

  @Input() appearance: string = '';

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
}

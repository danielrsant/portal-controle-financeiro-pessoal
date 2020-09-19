import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomizeInputsService } from 'src/app/shared/services/customize-inputs.service';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string = 'Senha';
  @Input() placeholder: string = 'Digite aqui';

  @Input() appearance: string = '';

  hide = true;

  appearance$: Observable<string>;

  constructor(
    private _customizeInputsService: CustomizeInputsService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._customizeInputsService.appearance;
  }

}

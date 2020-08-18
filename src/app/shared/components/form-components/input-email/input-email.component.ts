import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss']
})
export class InputEmailComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string = 'E-mail';
  @Input() placeholder: string = 'Digite aqui';

  @Input() maxLength: number;

  @Input() appearance: string = 'standard';

  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void { }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(value) {
    if (value.length > this.maxLength) {
      value = value.substring(0, (value.length - 1));
    }
    return value;
  }

}

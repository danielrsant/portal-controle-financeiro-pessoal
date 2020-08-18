import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string;
  @Input() placeholder: string = 'Digite aqui';
  @Input() maxLength: number;

  @Input() appearance: string = 'standard';

  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {

  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}

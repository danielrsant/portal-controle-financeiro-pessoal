import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StyleService } from 'src/app/shared/services/style.service';
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

  @Output() changeValue = new EventEmitter();

  constructor(
    private _utilsService: UtilsService,
    private _styleService: StyleService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._styleService.appearance$;
  }

  setValue(value): void {
    this.formGroup.get(this.formcontrolname).setValue(value.checked ? 1 : 0);
  }

  checkRequired(): any {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { MaterialModule } from '../../material/material.module';
import { ErrorsComponent } from './errors/errors.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { InputColorComponent } from './input-color/input-color.component';
import { InputCurrencyComponent } from './input-currency/input-currency.component';
import { InputDatepickerRangeComponent } from './input-datepicker-range/input-datepicker-range.component';
import { InputDatepickerComponent } from './input-datepicker/input-datepicker.component';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputFileComponent } from './input-file/input-file.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputRadioGroupComponent } from './input-radio-group/input-radio-group.component';
import { InputSelectMultipleComponent } from './input-select-multiple/input-select-multiple.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputTagComponent } from './input-tag/input-tag.component';
import { InputTextCpfCnpjComponent } from './input-text-cpf-cnpj/input-text-cpf-cnpj.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputToggleComponent } from './input-toggle/input-toggle.component';
import { InputTextAreaComponent } from './input-text-area/input-text-area.component';

@NgModule({
  declarations: [
    ErrorsComponent,
    InputSelectComponent,
    InputTextComponent,
    InputCurrencyComponent,
    InputColorComponent,
    InputAutocompleteComponent,
    InputSelectMultipleComponent,
    InputToggleComponent,
    InputTagComponent,
    InputTextAreaComponent,
    InputNumberComponent,
    InputDatepickerComponent,
    InputDatepickerRangeComponent,
    InputFileComponent,
    InputRadioGroupComponent,
    InputTextCpfCnpjComponent,
    InputEmailComponent,
    InputPasswordComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MaterialFileInputModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ErrorsComponent,
    InputTextComponent,
    InputCurrencyComponent,
    InputColorComponent,
    InputSelectComponent,
    InputAutocompleteComponent,
    InputSelectMultipleComponent,
    InputToggleComponent,
    InputTagComponent,
    InputTextAreaComponent,
    InputNumberComponent,
    InputDatepickerComponent,
    InputDatepickerRangeComponent,
    InputFileComponent,
    InputRadioGroupComponent,
    InputTextCpfCnpjComponent,
    InputEmailComponent,
    InputPasswordComponent
  ]
})
export class FormComponentsModule { }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FormComponentsModule } from './components/form-components/form-components.module';
import { SeveralComponentsModule } from './components/several-components/several-components.module';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormComponentsModule,
    SeveralComponentsModule,
    HttpClientModule,
  ],
  exports: [
    FormComponentsModule,
    SeveralComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    PerfectScrollbarModule,
  ]
})
export class SharedModule { }

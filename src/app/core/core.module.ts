import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class CoreModule { }
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MaterialModule } from '../../material/material.module';
import { FormComponentsModule } from '../form-components/form-components.module';
import { AccordionComponent } from './accordion/accordion.component';
import { AclComponent } from './acl/acl.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { CardComponent } from './card/card.component';
import { CustomizeComponent } from './customize/customize.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AclComponent,
    AccordionComponent,
    BusinessCardComponent,
    CardComponent,
    DataTableComponent,
    CustomizeComponent,
    FilterDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FormComponentsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    PerfectScrollbarModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    AclComponent,
    AccordionComponent,
    BusinessCardComponent,
    CardComponent,
    DataTableComponent,
    CustomizeComponent,
    FilterDialogComponent
  ],
})
export class SeveralComponentsModule { }

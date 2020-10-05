import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialFileInputModule } from 'ngx-material-file-input';
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
import { UserInputFileComponent } from './user-input-file/user-input-file.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AclComponent,
    AccordionComponent,
    BusinessCardComponent,
    CardComponent,
    DataTableComponent,
    CustomizeComponent,
    FilterDialogComponent,
    UserInputFileComponent
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
    MaterialFileInputModule,
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
    FilterDialogComponent,
    UserInputFileComponent
  ],
})
export class SeveralComponentsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: IndexComponent },
  { path: 'new', component: FormComponent },
  { path: ':id/view', component: FormComponent },
  { path: ':id/edit', component: FormComponent },
];

@NgModule({
  declarations: [
    IndexComponent,
    FormComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
})
export class ObjectiveModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
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
  declarations: [IndexComponent, FormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class FinancialMovementModule { }

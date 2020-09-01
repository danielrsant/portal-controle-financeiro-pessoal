import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: IndexComponent  },
  { path: 'new', component: FormComponent },
  { path: ':id/view', component: FormComponent },
  { path: ':id/edit', component: FormComponent },
];

@NgModule({
  declarations: [
    IndexComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoryModule { }

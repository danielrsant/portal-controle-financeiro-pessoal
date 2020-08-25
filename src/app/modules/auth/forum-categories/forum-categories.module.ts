import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';


import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ViewComponent },
  { path: 'index', redirectTo: '' },
];

@NgModule({
  declarations: [ 
    ViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ForumCategoriesModule { }

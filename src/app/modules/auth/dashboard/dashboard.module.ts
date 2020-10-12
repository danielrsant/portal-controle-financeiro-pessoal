import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'src/app/shared/shared.module';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: IndexComponent },
];

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxChartsModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from 'src/app/shared/shared.module';

import { EchartsPieComponent } from './echarts/echarts-pie.component';
import * as echarts from 'echarts';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: IndexComponent },
];

@NgModule({
  declarations: [
    EchartsPieComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }

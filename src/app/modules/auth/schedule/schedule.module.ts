import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from 'src/app/shared/shared.module';

import { IndexComponent } from './index/index.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: IndexComponent },
];

@NgModule({
  declarations: [IndexComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ScheduleModule { }

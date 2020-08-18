import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from 'src/app/shared/shared.module';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '**',
        component: CalendarComponent,
        children: [],
        // resolve: {
        //     chat: CalendarService
        // }
    }
];

@NgModule({
    declarations: [
        CalendarComponent,
        CalendarEventFormDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        AngularCalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
    ],
    providers: [
        CalendarService
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class CalendarModule {
}

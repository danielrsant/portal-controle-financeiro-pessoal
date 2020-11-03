import { AUTO_STYLE } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { sharedAnimations } from 'src/app/shared/animations';

import { CalendarService } from '../../../services/calendar.service';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { CalendarEventModel } from './event.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: sharedAnimations
})
export class CalendarComponent implements OnInit, OnDestroy {

    formFilter: FormGroup;
    dtToday: Date = new Date();

    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    dialogRef: any;
    events: CalendarEvent[] = [];
    eventsAllData = [];

    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;

    destroy$ = new Subject();

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService,
        private _toastr: ToastrService
    ) {
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };
    }


    ngOnInit(): void {
        this.createFormFilter();
        this.onRefresh();
        // this.refresh.next();
    }

    createFormFilter(): void {
        this.formFilter = new FormGroup({
            date: new FormControl(new Date())
        });
    }

    onRefresh(): void {
        this._calendarService.loadAll().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
            if (response) {
                this.events = [];
                response.data.forEach(element => {
                    let dtElement = new Date(element?.dtConta);
                    dtElement = new Date(dtElement.getTime() + dtElement.getTimezoneOffset() * 60000);
                    this.events.push({        
                        start: dtElement,
                        end: dtElement,   
                        title: element?.descricao,
                        allDay: true,
                        color: {
                            primary: element?.tipoMovimentacao?.descricao === 'Despesa' ? '#F44336' : '#36f44c',
                            secondary: '#FFCDD2'
                        },
                        resizable: {
                            beforeStart: false,
                            afterEnd: false
                        },
                        draggable: false,
                        meta: {
                            location: 'Situação: ' + element?.situacao,
                            notes: 'Total: R$ ' + element?.total
                        }
                    });

                    this.eventsAllData.push(element);
                });
                
            }
        },
            (error) => {
                this._toastr.error(error.error.message);
            }
        );
    }

    setEvents(): void {
        this.events = this.events.map(item => {
            item.actions = this.actions;
            return new CalendarEventModel(item);
        });
    }

    beforeMonthViewRender({ header, body }): void {
        const selectedDay = body.find((day) => {
            return day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (selectedDay) { // Set selected day style
            selectedDay.cssClass = 'cal-selected';
        }
    }


    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }

        this.selectedDay = day;
        this.refresh.next();
    }


    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next(true);
    }


    editEvent(event: CalendarEvent): void {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            maxHeight: '80vh',
            maxWidth: '90%',
            height: AUTO_STYLE,
            width: window.innerWidth < 900 ? '90%' : '50%',
            data: {
                event: this.eventsAllData[eventIndex],
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}



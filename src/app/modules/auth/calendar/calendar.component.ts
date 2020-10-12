import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { addDays, addHours, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
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
export class CalendarComponent implements OnInit {

    formFilter: FormGroup;
    dtToday: Date = new Date();

    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    dialogRef: any;
    events: CalendarEvent[] = [
        {
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'Testando, titulo.....................',
            allDay: true,
            color: {
                primary: '#F44336',
                secondary: '#FFCDD2'
            },
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: true,
            meta: {
                location: 'Los Angeles',
                notes: 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
            }
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'Testando, titulo..................... 2',
            allDay: false,
            color: {
                primary: '#1E90FF',
                secondary: '#D1E8FF'
            },
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: true,
            meta: {
                location: 'Los Angeles',
                notes: 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
            }
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: new Date(),
            title: 'Testando, titulo..................... 3',
            allDay: false,
            color: {
                primary: '#673AB7',
                secondary: '#D1C4E9'
            },
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: true,
            meta: {
                location: 'Los Angeles',
                notes: 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
            }
        }
    ];

    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService
    ) {
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };

        this.actions = [
            {
                label: '<i class="material-icons s-16 md-dark">edit</i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label: '<i class="material-icons s-16 md-dark">delete</i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];

        this.setEvents();
    }


    ngOnInit(): void {
        this.createFormFilter();
        // this.refresh.next();
    }

    createFormFilter() {
        this.formFilter = new FormGroup({
          date: new FormControl(new Date())
        });
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

    deleteEvent(event): void { }


    editEvent(action: string, event: CalendarEvent): void {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                event,
                action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {});
    }


    addEvent(): void {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                date: this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                const newEvent = response.getRawValue();
                newEvent.actions = this.actions;
                this.events.push(newEvent);
                this.refresh.next(true);
            });
    }
}



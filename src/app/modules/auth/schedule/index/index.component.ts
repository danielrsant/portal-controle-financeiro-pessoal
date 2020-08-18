import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { isSameDay, isSameMonth, startOfDay, addHours, subDays, addDays, endOfMonth } from 'date-fns';
import { Subject } from 'rxjs';

import { DialogComponent } from '../dialog/dialog.component';
import { sharedAnimations } from 'src/app/shared/animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: sharedAnimations
})
export class IndexComponent implements OnInit {

  formFilter: FormGroup;
  dtToday: Date = new Date();


  dialogRef: any;
  viewDate: Date = new Date();
  selectedDay: any = { date: startOfDay(new Date()) };

  actions = [
    {
      label: '<i class="material-icons s-16">edit</i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editEvent('edit', event);
      }
    },
    {
      label: '<i class="material-icons s-16">delete</i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: new Date(),
      end: addHours(new Date(), 1),
      title: 'Testando',
      color: {
        primary: '#673ab7',
        secondary: '#d1c4e9'
      },
      actions: this.actions,
    }
  ];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  constructor(private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.createFormFilter();
  }

  createFormFilter() {
    this.formFilter = new FormGroup({
      date: new FormControl(new Date())
    })
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

  addEvent(): void {
    this.dialogRef = this._matDialog.open(DialogComponent, {
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

  editEvent(action: string, event: CalendarEvent): void {
    const eventIndex = this.events.indexOf(event);

    this.dialogRef = this._matDialog.open(DialogComponent, {
      panelClass: 'event-form-dialog',
      data: {
        event: event,
        action: action
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          case 'save':

            this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
            this.refresh.next(true);

            break;
          case 'delete':
            // this.deleteEvent(event);
            break;
        }
      });
  }

  deleteEvent(event): void {
   

  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // console.warn('Dropped or resized', event);
    this.refresh.next(true);
  }

}

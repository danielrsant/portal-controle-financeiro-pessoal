import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

import { CalendarEventModel } from '../event.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  data;
  action: string;
  event: CalendarEvent;
  eventForm: FormGroup;
  dialogTitle: string;
  // presetColors = MatColors.presets;

  constructor(
    public matDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) {
    this.data = _data;
    this.event = _data.event;
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = this.event.title;
    }
    else {
      this.dialogTitle = 'New Event';
      this.event = new CalendarEventModel({
        start: _data.date,
        end: _data.date
      });
    }

    this.eventForm = this.createEventForm();
  }

  ngOnInit(): void {
  }


  createEventForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      allDay: new FormControl(),
      color: this._formBuilder.group({
        primary: new FormControl(),
        secondary: new FormControl()
      }),
      meta:
        this._formBuilder.group({
          location: new FormControl(),
          notes: new FormControl()
        })
    });
  }
}

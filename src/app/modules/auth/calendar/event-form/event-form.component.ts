import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

import { CalendarEventModel } from '../event.model';
import * as moment from 'moment-timezone';

@Component({
  selector: 'calendar-event-form-dialog',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent implements OnInit {
  form: FormGroup;
  event: any;

  constructor(
    public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.event = _data.event;
  }

  ngOnInit(): void {
    this.createForm();
    this.fillForm();
  }

  createForm(): void {
    const pessoa = JSON.parse(localStorage.getItem('user'));
    this.form = new FormGroup({
      descricao: new FormControl(null, [
        Validators.required,
        Validators.maxLength(150),
      ]),
      total: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      dtConta: new FormControl(new Date(), Validators.required),
      dtConclusao: new FormControl(null),
      dtLembrete: new FormControl(null),
      concluido: new FormControl(0),
      contaFixa: new FormControl(0),
      categoria: new FormControl(null, Validators.required),
      tipoMovimentacao: new FormControl(1, Validators.required),
      conta: new FormControl(null, Validators.required),
      pessoa: new FormControl({ id: pessoa.id }),
      repetir: new FormControl(0),
    });

    this.form.disable();
  }

  fillForm(): void {
    Object.keys(this.event).forEach(key => {
      if (['dtConta', 'dtLembrete', 'dtConclusao'].includes(key) && this.event[key]) {

        const [year, month, day] = this.event[key].split('-');
        this.event[key] = moment.tz(new Date(year, month - 1, day), 'America/Sao_Paulo').toDate();
      }
    });
    this.form.patchValue(this.event);
    this.form.get('tipoMovimentacao').setValue(this.event?.tipoMovimentacao?.descricao);
    this.form.get('conta').setValue(this.event?.conta?.descricao);
    this.form.get('categoria').setValue(this.event?.categoria?.descricao);
  }

}

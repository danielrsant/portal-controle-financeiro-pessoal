import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-select-example-modal',
  templateUrl: './select-example-modal.component.html',
  styleUrls: ['./select-example-modal.component.scss']
})
export class SelectExampleModalComponent implements OnInit, OnDestroy {

  examples = ['111111', '22222', '333333', '4444444', '5555555', '666666', '77777777'];

  susbcription: Subscription

  constructor(
    public dialogRef: MatDialogRef<SelectExampleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  selectExample(example) {
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }
  }
}

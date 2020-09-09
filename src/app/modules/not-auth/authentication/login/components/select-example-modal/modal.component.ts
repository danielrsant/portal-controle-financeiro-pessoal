import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  susbcription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }


  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }
  }
}

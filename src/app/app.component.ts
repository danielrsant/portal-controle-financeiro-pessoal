import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CustomizeService } from './shared/services/customize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'agenda10';
  theme$: Observable<any>;

  onDestroy$ = new Subject<any>();

  constructor(private _customizeService: CustomizeService) {
    this.theme$ = this._customizeService.theme;
    this.theme$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

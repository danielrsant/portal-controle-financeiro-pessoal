import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title = 'Título do Componente';
  @Input() subtitle = 'Subtítulo do Componente';

  theme$: Observable<any>;
  onDestroy$ = new Subject<any>();


  constructor(private _customizeService: CustomizeService) { }

  ngOnInit(): void {
    this.listenTheme();
  }

  listenTheme(): void {
    this.theme$ = this._customizeService.theme;
    this.theme$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
}

}

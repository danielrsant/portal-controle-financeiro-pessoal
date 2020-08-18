import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { sharedAnimations } from 'src/app/shared/animations';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: sharedAnimations,
})
export class HeaderComponent implements OnInit {

  @Input() backPage = false;

  @Input() title = 'Título';
  @Input() icon: string;

  @Input() btn: string;
  @Input() disabled: boolean = null;

  @Input() height = '200px';
  @Input() bgImage = false;

  @Output() backBtn = new EventEmitter();
  @Output() clickBtn = new EventEmitter();

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

  onCancel(): void {
    this.backBtn.emit();
  }

  onClickBtn() {
    this.clickBtn.emit();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}

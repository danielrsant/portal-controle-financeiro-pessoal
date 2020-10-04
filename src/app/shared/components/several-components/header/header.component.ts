import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { sharedAnimations } from 'src/app/shared/animations';
import { Operation } from 'src/app/shared/enums/operation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: sharedAnimations,
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() backPage = false;

  @Input() title = 'Título';
  @Input() icon: string;
  @Input() operation: Operation;

  @Input() btn: string;
  @Input() btnDisabled = false;

  @Input() height = '175px';
  @Input() bgImage = false;

  @Output() btnClick = new EventEmitter();

  onDestroy$ = new Subject<any>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  onClickBtn() {
    this.btnClick.emit();
  }

  onBackPage(): void {
    if (this.operation === Operation.NEW) {
      this._router.navigate(['../'], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['../../'], { relativeTo: this._activatedRoute });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}

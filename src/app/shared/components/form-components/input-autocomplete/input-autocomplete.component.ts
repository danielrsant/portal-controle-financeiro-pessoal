import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StyleService } from 'src/app/shared/services/style.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit, OnChanges, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() data: Array<any>;
  
  @Input() label: string;
  @Input() placeholder: string = 'Digite aqui';

  @Input() searchField: string;
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() imageField: string;

  @Input() appearance: string = '';

  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  private _isListening: Observable<any>;

  appearance$: Observable<string>;

  onDestroy$ = new Subject<any>();

  constructor(
    private _utilsService: UtilsService,
    private _cdr: ChangeDetectorRef,
    private _styleService: StyleService
  ) { }

  ngOnInit(): void {
    this.appearance$ = this._styleService.appearance$;
    this._start();
  }

  ngOnChanges(): void {
    this.filteredData.next(this.data);
    this._start();
  }

  private _start() {
    if (this.formGroup && this.formcontrolname && !this._isListening) {

      const control = this.formGroup.get(this.formcontrolname);
      this._isListening = control.valueChanges;

      this._isListening.pipe(takeUntil(this.onDestroy$)).subscribe(
        data => {
          const filterValue = control.value ? control.value.toLowerCase() : '';

          if (!filterValue || filterValue == '') {
            this.filteredData.next(this.data.slice());
            return;
          }
          this.filteredData.next(
            this.data.filter(item => item[this.searchField].toLowerCase().includes(filterValue))
          );

          this._cdr.detectChanges();
        });
    }
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

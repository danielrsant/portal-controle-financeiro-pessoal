import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { StyleService } from 'src/app/shared/services/style.service';

@Component({
  selector: 'app-input-select-multiple',
  templateUrl: './input-select-multiple.component.html',
  styleUrls: ['./input-select-multiple.component.scss']
})
export class InputSelectMultipleComponent implements OnInit, OnChanges, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() data: Array<any>;

  @Input() label: string;
  @Input() noEntriesFoundLabel = 'Nada encontrado';
  @Input() iconName: string;

  @Input() searchField: string;
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() secondDisplayField: string;

  @Input() appearance: string = '';

  @Output() search = new EventEmitter();
  @Output() select = new EventEmitter();

  public dataFilterCtrl: FormControl = new FormControl();
  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  appearance$: Observable<string>;

  onDestroy$ = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _utilsService: UtilsService,
    private _styleService: StyleService
  ) { }

  ngOnInit() {
    this.appearance$ = this._styleService.appearance$;
    this.listenSearch();
  }

  listenSearch() {
    this.dataFilterCtrl.valueChanges.pipe(debounceTime(300), takeUntil(this.onDestroy$)).subscribe(() => {
      this.filterData();
    });
  }

  protected filterData() {
    if (!this.data) { return; }

    let search = this.dataFilterCtrl.value;
    if (!search) {
      this.filteredData.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    if (this.searchField) {
      this.search.emit(search);
    } else {
      this.filteredData.next(
        this.data.filter(item => item[this.searchField].toLowerCase().includes(search))
      );
    }

    this._cdr.detectChanges();
  }

  ngOnChanges() {
    if (this.data) {
      this.filteredData.next(this.data);
    }
  }

  onSelectChange(value) {
    this.select.emit(value)
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

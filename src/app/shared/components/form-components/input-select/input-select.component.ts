import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CustomizeInputsService } from 'src/app/shared/services/customize-inputs.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() data: Array<any>;

  @Input() searchField: string;
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() secondDisplayField: string;

  @Input() label: string;
  @Input() iconName: string;
  @Input() noEntriesFoundLabel: string = 'Nenhum registro encontrado';

  @Input() optionClear: boolean = true;

  @Input() appearance: string = '';

  @Output() search = new EventEmitter();
  @Output() select = new EventEmitter();

  public selectSearch: FormControl = new FormControl();
  public dataFilterCtrl: FormControl = new FormControl();
  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  appearance$: Observable<string>;

  onDestroy$ = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _utilsService: UtilsService,
    private _customizeInputsService: CustomizeInputsService
  ) { }

  ngOnInit() {
    this.appearance$ = this._customizeInputsService.appearance;

    this.dataFilterCtrl.valueChanges.pipe(debounceTime(300), takeUntil(this.onDestroy$)).subscribe(
      (data) => {
        if (this.searchField) {
          this.search.emit(data);
        }
        this.filterData();
      });
  }

  onSearch(value) {
    this.dataFilterCtrl.setValue(value);
  }

  ngOnChanges() {
    if (this.data) {
      this.filteredData.next(this.data);
    }
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  protected filterData() {
    if (!this.data) {
      return;
    }

    let search = this.dataFilterCtrl.value;

    if (!search) {
      this.filteredData.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredData.next(
      this.data.filter(item => item[this.searchField].toLowerCase().includes(search))
    );

    this._cdr.detectChanges();
  }

  onSelectChange(event) {
    this.select.emit(event);
    this.formGroup.get(this.formcontrolname).setValue(event.value);
    this.selectSearch.setValue(null);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}

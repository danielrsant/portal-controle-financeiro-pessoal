import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { fadeInUp400ms, stagger40ms } from 'src/app/shared/animations';
import { UtilsService } from 'src/app/shared/services/utils.service';
import * as XLSX from 'xlsx';

import { DefaultParams } from '../../../enums/default';
import { TableColumn } from '../../../models/table-column.interface';
import { Config } from './config';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  searchCtrl = new FormControl();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() data: Array<any> = [];
  @Input() startPageSize = 10;
  @Input() config: Config;
  @Input() selection: SelectionModel<any>;
  @Input() columns: TableColumn<any>[] = [];
  @Input() title: string;

  @Input() isViewed = true;
  @Input() isUpdated = true;
  @Input() isDeleted = true;

  @Output() refresh = new EventEmitter();
  @Output() clickRow = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() dialogFilter = new EventEmitter();

  dataSource: MatTableDataSource<{}>;
  actualDirection: string;
  actualActive: string;
 
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 50, 100, 300];

  DEFAULT_AVATAR = DefaultParams.DEFAULT_AVATAR;

  inputOpen = false;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  get visibleColumns(): any {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  constructor(
    private _changesDetector: ChangeDetectorRef,
    private _utilsService: UtilsService
  ) {
    this._utilsService.paginatorWasChanged.subscribe(() => {
      this.pageIndex = 0;
    });
  }

  ngOnInit(): void {
    this.pageSize = this.startPageSize;
    this.pageSizeOptions = [this.startPageSize];

    if (this.searchCtrl) {
      this.searchCtrl.valueChanges.pipe(debounceTime(500)).subscribe(value => this.search.emit(value));
    }

    this._start();
  }

  ngOnChanges(): void {
    this._start();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  private _start(): void {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
      this._changesDetector.detectChanges();
      this._startPaginator();
    }
  }

  public sortChange(sort: Sort): void {
    let canEmit = false;

    if ((this.actualDirection !== sort.direction) || (this.actualActive !== sort.active)) {
      canEmit = true;
    }

    const direction = sort.direction.toUpperCase();
    const active = sort.active;
    this.actualDirection = direction;
    this.actualActive = active;
    if (canEmit) {
      const params = {
        sort: direction ? `${active},${direction}` : ''
      };
      this.onRefresh(params);
    }

  }

  private _startPaginator(): void {
    if (this.config && this.config.total) {
      this.length = this.config.total;
      if (this.length > this.startPageSize) {
        if (this.startPageSize !== 10) {
          this.pageSizeOptions = [this.startPageSize, 50, 100, 300];
        } else {
          this.pageSizeOptions = [10, 50, 100, 300];
        }
      }
    }

    if (this.paginator) {
      this.paginator.page.pipe(takeUntil(this._destroy$)).subscribe(() => {
        let canEmit = false;

        if ((this.pageSize !== this.paginator.pageSize) || (this.pageIndex !== this.paginator.pageIndex)) {
          canEmit = true;
        }

        this.pageSize = this.paginator.pageSize;
        this.pageIndex = this.paginator.pageIndex;

        if (canEmit) {
          this.onRefresh(
            {
              page: this.paginator.pageIndex + 1,
              limit: this.paginator.pageSize
            }
          );
        }
      }
      );
    }
  }

  onFilterChange(value: string): void {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  onRefresh(params = {}): void {
    this.selection.clear();
    this.refresh.emit(params);
  }

  console(x): void {
    console.log(x);
  }

  onClickRow(row: any): void {
    this.clickRow.emit(row);
  }

  onCreate(): void {
    this.create.emit();
  }

  trackByProperty<T>(index: number, column: TableColumn<T>): any {
    return column.property;
  }

  toggleColumnVisibility(column: any, event: Event): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(event): void {
    if (event.checked) {
      this.dataSource.data.forEach(row => this.selection.select(row));
    } else {
      this.selection.clear();
    }
  }

  onActions(data, element): void {
    switch (data) {
      case 'detalhar':
        this.view.emit(element);
        break;

      case 'alterar':
        this.update.emit(element);
        break;

      case 'excluir':
        this.delete.emit(element);
        break;
    }
  }

  onClickFilterButton(): void {
    this.dialogFilter.emit();
  }

  exportexcel(): void {
    const element = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, moment(new Date()).format('YYYY-MM-DD') + '.xlsx');
  }

}

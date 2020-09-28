import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { FinancialMovementService } from 'src/app/services/financial-movement.service';
import { MovementTypeService } from 'src/app/services/movement-type.service';
import { Config } from 'src/app/shared/components/several-components/data-table/config';
import { FilterDialogComponent } from 'src/app/shared/components/several-components/filter-dialog/filter-dialog.component';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { PageConfig } from './page-config';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _loadingService: LoadingService,
    private _categoryService: CategoryService,
    private _movementTypeService: MovementTypeService,
    private _financialMovementService: FinancialMovementService,
    private _dialog: MatDialog,
  ) { }

  title = 'Movimentações';
  icon = 'home';
  operation: Operation = Operation.INDEX;

  options: any = {};
  dataSource: any[] = [];
  columns = new PageConfig().columns;
  configuration = new Config({}, 0);

  formFilter: FormGroup;
  filterFields = new PageConfig().filterFields;

  selection = new SelectionModel<any>(true, []);

  destroy$ = new Subject<any>();

  ngOnInit(): void {
    this.setFormFilter();
    this.onRefresh();
  }

  setFormFilter(): void {
    this._categoryService.loadAll()
      .pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        if (!response) { return; }
        const categoria = this.filterFields.find(field => field.formcontrolname === 'categoria');
        categoria.select.data = response.data;
      });

    this._movementTypeService.loadAll()
      .pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        if (!response) { return; }
        const tipoMovimentacao = this.filterFields.find(field => field.formcontrolname === 'tipoMovimentacao');
        tipoMovimentacao.select.data = response.data;
      });
  }

  onRefresh(params?: { page?: number; limit?: number; s?: any }): void {
    this.options = { ...this.options, ...params };

    const { s } = this.options;
    if (!s) {
      delete this.options.s;
    }

    const { sort } = this.options;
    if (sort && this.options.sort.indexOf('tipoMovimentacao') > -1) {
      this.options.sort = this.options.sort.replace('tipoMovimentacao', 'tipoMovimentacao.id');
    } else if (sort && this.options.sort.indexOf('categoria') > -1) {
      this.options.sort = this.options.sort.replace('categoria', 'categoria.id');
    }

    this._loadingService.show();
    this._financialMovementService.loadAll(this.options).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          response.data = response.data.map((item) => {
            item.dtConclusao = item.dtConclusao ? moment.utc(item.dtConclusao).format('DD/MM/YYYY')  : '-';
            item.dtLancamento = moment.utc(item.dtLancamento).format('DD/MM/YYYY');
            item.dtLembrete = item.dtLembrete ? moment.utc(item.dtLembrete).format('DD/MM/YYYY')  : '-';
            item.dtVencimento = item.dtVencimento ? moment.utc(item.dtVencimento).format('DD/MM/YYYY')  : '-';
            item.tipoMovimentacao = item.tipoMovimentacao.descricao;
            item.categoria = item.categoria.descricao;
            return item;
          });

          this.dataSource = response.data;
          this.configuration.total = response.total;
          this._loadingService.hide();
        }
      },
      (error) => {
        this._loadingService.hide();
        console.log(error);
      }
    );
    this.filterOptions();
  }

  filterOptions(): void {
    Object.entries(this.options).forEach(([key, value]) => {
      if (!value) {
        delete this.options[key];
      }
    });
  }

  onCreate(): void {
    this._router.navigate([`../new`], { relativeTo: this._activatedRoute });
  }

  onView(row: any): void {
    this._router.navigate([`../${row.id}/view`], {
      relativeTo: this._activatedRoute,
    });
  }

  onUpdate(row: any): void {
    this._router.navigate([`../${row.id}/edit`], {
      relativeTo: this._activatedRoute,
    });
  }

  onDelete(item: any): void {
    this._loadingService.show();
    this._financialMovementService.destroy(item.id).pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.onRefresh();
    });
  }

  onSearch(search: string): void {
    this._utilsService.paginatorWasChanged.emit();
    const params = { s: null };

    if (search.length) {
      params.s = JSON.stringify({
        descricao: {
          $contL: search,
        },
      });
    }

    this.onRefresh({ ...params });
  }

  openDialogFilter(): void {
    this._dialog.open(FilterDialogComponent, {
      data: {
        form: this.formFilter,
        fields: this.filterFields
      }
    }).afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      const obj = this.removeNullUndefinedProperties(this.formFilter.value);
      const filter = Object.keys(obj).map(item => {
        if (!obj[item]) {
          return null;
        } else if (this.filterFields.find(field => field.type === 'select' && field.formcontrolname === item)) {
          return `${item}.id||$eq||${obj[item]}`;
        } else if (item === 'possuiLembrete') {
          return `dtLembrete||$notnull`;
        } else {
          return `${item}||$eq||${obj[item]}`;
        }
      }).filter(item => item !== null && item !== undefined);

      this.options = { ...this.options, filter };
      this.onRefresh();
    });
  }

  removeNullUndefinedProperties(payload): any {
    Object.keys(payload).forEach(key => payload[key] === undefined || payload[key] === null ? delete payload[key] : {});
    return payload;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

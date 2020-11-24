import { AUTO_STYLE } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
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
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _currencyPipe: CurrencyPipe,
    private _categoryService: CategoryService,
    private _movementTypeService: MovementTypeService,
    private _financialMovementService: FinancialMovementService,
  ) { }

  title = 'Movimentações';
  icon = 'import_export';
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
    this._categoryService.loadAll({ filter: 'status||$eq||1' })
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

  onRefresh(params?: any): void {
    this.options = { ...this.options, ...params };

    const { filter } = this.options;
    if (!filter) {
      delete this.options.filter;
    }

    const { sort } = this.options;
    if (sort && this.options.sort.indexOf('tipoMovimentacao') > -1) {
      this.options.sort = this.options.sort.replace('tipoMovimentacao', 'tipoMovimentacao.id');
    } else if (sort && this.options.sort.indexOf('categoria') > -1) {
      this.options.sort = this.options.sort.replace('categoria', 'categoria.id');
    }

    this.dataSource = null;
    this._financialMovementService.loadAll(this.options).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          response.data = response.data.map((item) => {
            item.dtConclusao = item.dtConclusao ? moment.utc(item.dtConclusao).format('DD/MM/YYYY') : '-';
            item.dtConta = moment.utc(item.dtConta).format('DD/MM/YYYY');
            item.dtLembrete = item.dtLembrete ? moment.utc(item.dtLembrete).format('DD/MM/YYYY') : 'Sem lembrete';
            item.tipoMovimentacao = item.tipoMovimentacao.descricao === 'Receita' ? {icon: 'arrow_upward', color: '#ABE188'} : {icon: 'arrow_downward', color: 'red'};
            item.categoria = item.categoria.descricao;
            item.conta = item.conta.descricao;
            item.total = item.total ? this._currencyPipe.transform(item.total, 'BRL') : 'R$00.00';
            return item;
          });

          this.dataSource = response.data;
          this.configuration.total = response.total;
          this._loadingService.hide();
        }
      },
      (error) => {
        this._toastr.error(error.error.message);
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
    const params = { filter: null };

    if (search.length) {
      params.filter = [`descricao||$contL||${search}`] ;
    }

    this.onRefresh({ ...params });
  }

  openDialogFilter(): void {
    this._dialog.open(FilterDialogComponent, {
      maxHeight: '80vh',
      maxWidth: '90%',
      height: AUTO_STYLE,
      width: window.innerWidth < 900 ? '90%' : '50%',
      data: {
        form: this.formFilter,
        fields: this.filterFields
      }
    }).afterClosed().pipe(takeUntil(this.destroy$)).subscribe((form) => {
      if (!form) { return; }

      this.formFilter = form;
      const obj = this._utilsService.removeNullUndefinedProperties(form.value);
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

  formatDateField(payload): any {
    Object.keys(payload).forEach(key => {
      if (payload[key] instanceof Date) {
        payload[key] = moment.tz(payload[key], 'America/Sao_Paulo').format('YYYY-MM-DD 00:00:00');
      }
    });

    return payload;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

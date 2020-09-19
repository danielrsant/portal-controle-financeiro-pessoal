import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/shared/components/several-components/data-table/config';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { TableColumn } from 'src/app/shared/models/table-column.interface';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FinancialMovementService } from 'src/app/services/financial-movement.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from 'src/app/shared/components/several-components/filter-dialog/filter-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { IFormField } from 'src/app/shared/interfaces/form-filter.interface';
import { CategoryService } from 'src/app/services/category.service';
import { MovementTypeService } from 'src/app/services/movement-type.service';
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
  paginationInitial = { page: 0, limit: 10 };

  dataSource: any[] = [];
  columns = new PageConfig().columns;

  formFilter: FormGroup;
  filterFields = new PageConfig().filterFields;

  selection = new SelectionModel<any>(true, []);
  configuration = new Config({}, 0);

  subscription: Subscription;

  ngOnInit(): void {
    this.setFormFilter();
    this.onRefresh(this.paginationInitial);
  }

  setFormFilter() {
    this.formFilter = new FormGroup({
      id: new FormControl(),
      tipoMovimentacao: new FormControl(),
      dataLancamento: new FormControl(),
      dataVencimento: new FormControl(),
      dataConclusao: new FormControl(),
      pago: new FormControl(),
      categoria: new FormControl(),
      possuiLembrete: new FormControl(),
      contaFixa: new FormControl(),
    });

    this._categoryService.loadAll()
      .subscribe((response: any) => {
        if (!response) { return; }
        const categoria = this.filterFields.find(field => field.formcontrolname === 'categoria');
        categoria.select.data = response.data;
      });

    this._movementTypeService.loadAll()
      .subscribe((response: any) => {
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
    this._financialMovementService.loadAll(this.options).subscribe(
      (response: any) => {
        if (response) {
          const data: any[] = response.data.map((item) => {
            const obj = {
              id: item.id,
              descricao: item.descricao,
              contaFixa: item.contaFixa,
              dtConclusao: item.dtConclusao ? moment.utc(item.dtConclusao).format('DD/MM/YYYY') : '-',
              dtLancamento: moment.utc(item.dtLancamento).format('DD/MM/YYYY'),
              dtLembrete: item.dtLembrete ? moment.utc(item.dtLembrete).format('DD/MM/YYYY') : '-',
              dtVencimento: item.dtVencimento ? moment.utc(item.dtVencimento).format('DD/MM/YYYY') : '-',
              lembreteEnviado: item.lembreteEnviado,
              pago: item.pago,
              tipoMovimentacao: item.tipoMovimentacao.descricao,
              categoria: item.categoria.descricao,
              total: item.total,
            };

            return obj;
          });
          this.dataSource = data;
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

  filterOptions() {
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
    this._financialMovementService.destroy(item.id).subscribe(response => {
      this.onRefresh();
    });
  }

  onSearch(search: string) {
    this._utilsService.paginatorWasChanged.emit();
    const params = { s: null };

    if (search.length) {
      params.s = JSON.stringify({
        descricao: {
          $contL: search,
        },
      });
    }

    this.onRefresh({ ...this.paginationInitial, ...params });
  }

  openDialogFilter() {
    this._dialog.open(FilterDialogComponent, {
      data: {
        form: this.formFilter,
        fields: this.filterFields
      }
    }).afterClosed().subscribe(() => {
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

  removeNullUndefinedProperties(payload) {
    Object.keys(payload).forEach(key => payload[key] === undefined || payload[key] === null ? delete payload[key] : {});

    return payload;
  }

  ngOnDestroy(): void { }
}

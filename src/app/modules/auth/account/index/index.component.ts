import { FinancialInstitutionService } from './../../../../services/financial-institution.service';
import { AUTO_STYLE } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
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
    private _accountService: AccountService,
    private _dialog: MatDialog,
    private _currencyPipe: CurrencyPipe,
    private _toastr: ToastrService,
    private _financialInstutionalService: FinancialInstitutionService,
  ) { }

  title = 'Contas';
  icon = 'account_balance_wallet';
  operation: Operation = Operation.INDEX;

  options: any = {};
  paginationInitial = { page: 1, limit: 10 };

  dataSource: any[] = [];
  columns = new PageConfig().columns;
  configuration = new Config({}, 0);

  formFilter: FormGroup;
  filterFields = new PageConfig().filterFields;
  selection = new SelectionModel<any>(true, []);

  destroy$ = new Subject();

  ngOnInit(): void {
    this.setFormFilter();
    this.onRefresh(this.paginationInitial);
  }

  onRefresh(params?: any): void {
    this.options = { ...this.options, ...params };

    const { filter } = this.options;
    if (!filter) {
      delete this.options.filter;
    }

    this.dataSource = null;
    this._accountService.loadAll(this.options).subscribe(
      (response: any) => {
        if (response) {

          this.dataSource = response.data.map(item => {
            item.instituicaoFinanceira = item.instituicaoFinanceira ? item.instituicaoFinanceira.descricao : '';
            item.tipoConta = item.tipoConta ? item.tipoConta.descricao : '';

            return item;
          });

          this.configuration.total = response.total;
        }
      },
      (error) => {
        this._toastr.error(error.error.message);
      }
    );
    this.filterOptions();
  }

  setFormFilter(): void {
    this._financialInstutionalService.loadAll({ filter: 'status||$eq||1' })
      .pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        if (!response) { return; }
        const instituicaoFinanceira = this.filterFields.find(field => field.formcontrolname === 'instituicaoFinanceira');
        instituicaoFinanceira.select.data = response.data;
      });

  }

  filterOptions(): void {
    Object.entries(this.options).forEach(([key, value]) => {
      if (!value) {
        delete this.options[key];
      }
    });
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
        } else {
          return `${item}||$eq||${obj[item]}`;
        }
      }).filter(item => item !== null && item !== undefined);

      this.options = { ...this.options, filter };
      this.onRefresh();
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
    this._accountService.destroy(item.id).pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.onRefresh();
      this._loadingService.hide();
    });
  }
  onSearch(search: string): void {
    this._utilsService.paginatorWasChanged.emit();
    const params = { filter: null };

    if (search.length) {
      params.filter = `descricao||$contL||${search}` ;
      // params.s = JSON.stringify({
      //   descricao: {
      //     $contL: search,
      //   },
      // });
    }

    this.onRefresh({ ...params });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

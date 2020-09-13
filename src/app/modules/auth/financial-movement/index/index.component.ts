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
    private _financialMovementService: FinancialMovementService
  ) {}

  title = 'Movimentações';
  icon = 'home';
  operation: Operation = Operation.INDEX;

  options = {};
  paginationInitial = { page: 0, limit: 10 };

  dataSource: any[] = [];
  columns: TableColumn<any>[] = [
    { label: 'Ações', property: 'aaa', type: 'actions', visible: true },
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Descrição', property: 'descricao', type: 'text', visible: true },
    { label: 'Conta fixa', property: 'contaFixa', type: 'text', visible: true },
    {
      label: 'Data de conclusão',
      property: 'dtConclusao',
      type: 'text',
      visible: true,
    },
    {
      label: 'Data de lançamento',
      property: 'dtLancamento',
      type: 'text',
      visible: true,
    },
    {
      label: 'Data de lembrete',
      property: 'dtLembrete',
      type: 'text',
      visible: true,
    },
    {
      label: 'Data de vencimento',
      property: 'dtVencimento',
      type: 'text',
      visible: true,
    },
    {
      label: 'Lembrete enviado',
      property: 'lembreteEnviado',
      type: 'text',
      visible: true,
    },
    { label: 'Pago', property: 'pago', type: 'text', visible: true },
    {
      label: 'Tipo de movimentação',
      property: 'tipoMovimentacao',
      type: 'text',
      visible: true,
    },
    { label: 'Categoria', property: 'categoria', type: 'text', visible: true },
    { label: 'Total', property: 'total', type: 'text', visible: true },
  ];

  selection = new SelectionModel<any>(true, []);
  configuration = new Config({}, 0);

  subscription: Subscription;

  ngOnInit(): void {
    this.onRefresh(this.paginationInitial);
    this.onRefresh();
  }

  onRefresh(params?: { page?: number; limit?: number; s?: any }): void {
    this.options = { ...this.options, ...params };
    this._financialMovementService.loadAll(this.options).subscribe(
      (response: any) => {
        if (response) {
          const data: any[] = response.data.map((item) => {
            const obj = {
              descricao: item.descricao,
              contaFixa: item.contaFixa,
              dtConclusao: item.dtConclusao ? moment.utc(item.dtConclusao).format('DD/MM/YYYY') : '',
              dtLancamento: moment.utc(item.dtLancamento).format('DD/MM/YYYY'),
              dtLembrete: item.dtLembrete ? moment.utc(item.dtLembrete).format('DD/MM/YYYY') : '',
              dtVencimento: item.dtVencimento ? moment.utc(item.dtVencimento).format('DD/MM/YYYY'): '',
              lembreteEnviado: item.lembreteEnviado,
              pago: item.pago,
              tipoMovimentacao: item.tipoMovimentacao.descricao,
              categoria: item.categoria.descricao,
              total: item.total,
            };

            return obj;
          });
          this.dataSource = data;
        }
      },
      (error) => {}
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

  onDelete(item: any): void {}

  onSearch(search: string) {
    this._utilsService.paginatorWasChanged.emit();
    const params = { s: null };
    if (search) {
      params.s = JSON.stringify({
        description: {
          $contL: search,
        },
      });
    }
    this.onRefresh({ ...this.paginationInitial, ...params });
  }

  ngOnDestroy(): void {}
}

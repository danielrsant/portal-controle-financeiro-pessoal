import { Operation } from 'src/app/shared/enums/operation';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObjectiveService } from 'src/app/services/objective.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  title = 'Objetivos';
  icon = 'done';

  operation: Operation = Operation.INDEX;

  options: any = {};
  destroy$ = new Subject<any>();
  dataSource: any[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _loadingService: LoadingService,
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _currencyPipe: CurrencyPipe,
    private _objectiveService: ObjectiveService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
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
    this._objectiveService.loadAll(this.options).pipe(takeUntil(this.destroy$), map((response: any) => {
      response.data = response.data.map(data => {
        data.total = Number(data.total);
        data.total_depositado = Number(data.total_depositado);

        return data;
      });
      return response;
    })).subscribe(
      (response: any) => {
        if (response) {
          this.dataSource = response.data;
        }
        this._loadingService.hide();
      },
      (error) => {
        this._loadingService.hide();
        this._toastr.error(error.error.message);
      }
    );
  }

  onCreate(): void {
    this._router.navigate([`../new`], { relativeTo: this._activatedRoute });
  }

  onAdd(id: number): void {
    this._router.navigate([`../${id}/edit`], {
      relativeTo: this._activatedRoute,
    });
  }

}

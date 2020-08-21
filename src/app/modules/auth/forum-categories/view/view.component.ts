import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { TableColumn } from 'src/app/shared/models/table-column.interface';
import { Config } from 'src/app/shared/components/several-components/data-table/config';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  constructor(
    // private _forumCategoryService: anyService,
    private dialog: MatDialog,
    private _utilsService: UtilsService,
    private _loadingService: LoadingService,
  ) { }

  paginationInitial = { page: 1, limit: 10 };
  options = {};

  operation: Operation;
  dataSource: any[] = [
    {id: 2, description: 'test'},
    {id: 2, description: 'test'},
    {id: 2, description: 'test'},
    {id: 2, description: 'test'},
    {id: 2, description: 'test'},
    {id: 2, description: 'test'},
    {id: 2, description: 'test'},
    {id: 2, description: 'test'}
  ];

  columns: TableColumn<any>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'DESCRIPTION', property: 'description', type: 'text', visible: true },
    { label: 'Ações', property: 'aaa', type: 'actions', visible: true },
  ];

  subscription: Subscription;
  selection = new SelectionModel<any>(true, []);
  configuration = new Config({}, 0);

  ngOnInit(): void {
    this.onRefresh(this.paginationInitial);
  }

  filterOptions() {
    Object.entries(this.options).forEach(([key, value]) => {
      if (!value) { delete this.options[key]; }
    });
  }

  onRefresh(params?: { page?: number; limit?: number; s?: any; }): void {
    this.options = { ...this.options, ...params };
    this.filterOptions();
    // this._loadingService.show();
    // this.subscription = this._forumCategoryService.loadAll(this.options).subscribe((result: any) => {
    //   const data: any[] = result.data;
    //   this.dataSource = data;
    //   this.configuration.total = result.total;
    // },
    // error => {
    //   this.subscription = this.translate.get('SWAL.ERROR').subscribe(res => {
    //     this._swalService.error(res, error.error.message);
    //   });
    // },
    // () => this._loadingService.hide());
  }

  onCreate() {
    // this.dialog.open(FormComponent, { minWidth: '40%' }).afterClosed().subscribe(res => {
    //   if (res?.refresh) { this.onRefresh(); }
    // });
  }

  onUpdate(item: any) {
    // this.dialog.open(FormComponent, {
    //   minWidth: '40%',
    //   data: { item, operation: Operation.EDIT }
    // }).afterClosed().subscribe(res => {
    //   if (res?.refresh) { this.onRefresh(); }
    // });
  }

  onDelete(item: any) {
    // this.subscription = this.translate.get('SWAL.CONFIRM_THE_DELETION').subscribe(res => {
    //   this._swalService.confirm(res).then(result => {
    //     if (result.isConfirmed) {
    //       this._loadingService.show();
    //       this._forumCategoryService.destroy(item.id).subscribe(
    //         () => {
    //           this.subscription = this.translate.get('SWAL.SUCCESSFULLY_DELETED').subscribe(res => {
    //             this.onRefresh();
    //             this._swalService.success(res);
    //           });
    //         },
    //         error => {
    //           this.subscription = this.translate.get('SWAL.ERROR').subscribe(res => {
    //             this._swalService.error(res, error.error.message);
    //           });
    //         },
    //         () => this._loadingService.hide()
    //       );
    //     }
    //   });
    // });
  }

  onView(item: any) {
    // this.dialog.open(FormComponent, {
    //   minWidth: '40%',
    //   data: { item, operation: Operation.VIEW }
    // });
  }

  onClickRow(row: any): void {
    this.onView(row);
  }

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
}

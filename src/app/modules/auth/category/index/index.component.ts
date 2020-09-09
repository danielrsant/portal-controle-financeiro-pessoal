import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Config } from 'src/app/shared/components/several-components/data-table/config';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { TableColumn } from 'src/app/shared/models/table-column.interface';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _loadingService: LoadingService,
    private _categoryService: CategoryService
  ) { }

  title = 'Categorias';
  icon = 'home';
  operation: Operation = Operation.INDEX;

  options = {};
  paginationInitial = { page: 1, limit: 10 };

  dataSource: any[] = [];
  columns: TableColumn<any>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Ações', property: 'aaa', type: 'actions', visible: true },
  ];

  selection = new SelectionModel<any>(true, []);
  configuration = new Config({}, 0);

  subscription: Subscription;

  ngOnInit(): void {
    this.onRefresh(this.paginationInitial);
    this.onRefresh();
  }

  onRefresh(params?: { page?: number; limit?: number; s?: any; }): void {
    this.options = { ...this.options, ...params };
    this._categoryService.loadAll(this.options).subscribe((response: any) => {
          if (response) {
            console.log('resposta =>', response);
          }
        },
        error => {
        }
      );
    this.filterOptions();
  }

  filterOptions() {
    Object.entries(this.options).forEach(([key, value]) => {
      if (!value) { delete this.options[key]; }
    });
  }

  onCreate(): void {
    this._router.navigate([`../new`], { relativeTo: this._activatedRoute });
  }

  onView(row: any): void {
    this._router.navigate([`../${row.id}/view`], { relativeTo: this._activatedRoute });
  }
  
  onUpdate(row: any): void {
    this._router.navigate([`../${row.id}/edit`], { relativeTo: this._activatedRoute });
  }


  onDelete(item: any): void { }

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

  ngOnDestroy(): void {
  }

}
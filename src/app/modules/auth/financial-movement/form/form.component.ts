import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FinancialMovementService } from '../../../../services/financial-movement.service';
import { MovementTypeService } from '../../../../services/movement-type.service';
import { LoadingService } from '../../../../shared/components/several-components/loading/loading.service';
import { CategoryService } from './../../../../services/category.service';
import { Operation } from './../../../../shared/enums/operation';

// tslint:disable: variable-name

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  id: number;
  title: string;
  icon = 'home';
  operation: Operation;

  form: FormGroup;

  tipoMovimentacao = [
    { id: 1, description: 'Receita' },
    { id: 2, description: 'Despesa' },
  ];

  categories$: Observable<any[]>;
  movementTypes$: Observable<any[]>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _financialMovementService: FinancialMovementService,
    private _categoryService: CategoryService,
    private _movementTypeService: MovementTypeService,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.onRefresh();
  }

  onRefresh() {
    this.categories$ = this._categoryService.loadAll();
    this.movementTypes$ = this._movementTypeService.loadAll();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id as number;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Movimentação' : 'Visualizando Movimentação';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Movimentação';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      total: new FormControl(0, Validators.required),
      dtLancamento: new FormControl(new Date(), Validators.required),
      dtConclusao: new FormControl(null),
      dtLembrete: new FormControl(null),
      dtVencimento: new FormControl(null),
      pago: new FormControl(0),
      contaFixa: new FormControl(0),
      categoria: new FormControl(null, Validators.required),
      tipoMovimentacao: new FormControl(null, Validators.required),
      pessoa: new FormControl({ id: 1 }),
    });
  }

  onSave(): void {
    this._loadingService.show();
    if (this.operation === Operation.NEW) {
      this.onCreate();
    } else {
      this.onUpdate();
    }
  }

  onCreate(): void {
    this._financialMovementService.create(this.form.value).subscribe((response: any) => {
      if (response) {
        console.log('resposta =>', response);
        this._loadingService.hide();
      }
    },
      error => {
        this._loadingService.hide();
      }
    );
  }

  onUpdate(): void {
    this._financialMovementService.update(this.form.value.id, this.form.value).subscribe((response: any) => {
      if (response) {
        console.log('resposta =>', response);
        this._loadingService.hide();
      }
    },
      error => {
        this._loadingService.hide();
      }
    );
  }


  ngOnDestroy(): void {
  }

}

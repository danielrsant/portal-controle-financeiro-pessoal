// tslint:disable: variable-name

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FinancialMovementService } from '../../../../services/financial-movement.service';
import { LoadingService } from '../../../../shared/components/several-components/loading/loading.service';
import { Operation } from './../../../../shared/enums/operation';

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

  categorias = [
    { id: 1, description: 'Outros' },
    { id: 2, description: 'Entretenimento' },
  ];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: FinancialMovementService,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
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
      pago: new FormControl(null),
      contaFixa: new FormControl(null),
      categoria: new FormControl(null, Validators.required),
      tipoMovimentacao: new FormControl(null, Validators.required),
      pessoa: new FormControl(null, Validators.required),
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
    this._categoryService.create(this.form.value).subscribe((response: any) => {
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
    this._categoryService.update(this.form.value.id, this.form.value).subscribe((response: any) => {
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

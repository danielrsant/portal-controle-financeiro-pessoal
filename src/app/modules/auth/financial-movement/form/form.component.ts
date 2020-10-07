import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FinancialMovementService } from '../../../../services/financial-movement.service';
import { MovementTypeService } from '../../../../services/movement-type.service';
import { LoadingService } from '../../../../shared/components/several-components/loading/loading.service';
import { CategoryService } from './../../../../services/category.service';
import { Operation } from './../../../../shared/enums/operation';

// tslint:disable: variable-name

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  id: number;
  title: string;
  icon = 'import_export';
  operation: Operation;

  form: FormGroup;

  categories$: Observable<any[]>;
  movementTypes$: Observable<any[]>;

  movementTypeParams = {
    title: 'Receita',
    statusAccount: 'Recebido',
    fixedAccount: 'Receita fixa',
  };

  dtHoje = new Date();

  destroy$ = new Subject();

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
    this.setParamsAccount();
    this.onListenToggleInput();
    this.setForm();
  }

  onRefresh(): void {
    this.categories$ = this._categoryService.loadAll({ filter: 'status||$eq||1' });
    this.movementTypes$ = this._movementTypeService.loadAll();
  }

  setParamsAccount(): void {
    this.form.get('tipoMovimentacao').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value === 1) {
        // Receita
        this.movementTypeParams.title = 'Receita';
        this.movementTypeParams.statusAccount = 'Recebido';
        this.movementTypeParams.fixedAccount = 'Receita fixa';
      } else {
        // Despesa
        this.movementTypeParams.title = 'Despesa';
        this.movementTypeParams.statusAccount = 'Pago';
        this.movementTypeParams.fixedAccount = 'Despesa fixa';
      }
    });
  }

  onListenToggleInput(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data.contaFixa && data.repetir) {
        this.form.get('contaFixa').reset();
        this.form.get('repetir').reset();
      }
    });
  }

  onChangeConcluidoToggleButton(value): void {
    if (this.operation === Operation.EDIT) {
      if (value) {
        this.form.disable();
        // this.form.markAsPristine();
        this.form.get('pessoa').enable();
        this.form.get('id').enable();
        this.form.get('dtConclusao').enable();
        this.form.get('concluido').enable();
      } else {
        this.form.enable();
      }
    }

  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id as number;
    if (this.id) {
      this.operation =
        this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1
          ? Operation.EDIT
          : Operation.VIEW;
      this.title =
        this.operation === Operation.EDIT
          ? 'Alterando Movimentação'
          : 'Visualizando Movimentação';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Movimentação';
    }
  }

  createForm(): void {
    const pessoa = JSON.parse(localStorage.getItem('user'));
    this.form = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, [
        Validators.required,
        Validators.maxLength(150),
      ]),
      total: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      dtConta: new FormControl(new Date(), Validators.required),
      dtConclusao: new FormControl(null),
      dtLembrete: new FormControl(null),
      concluido: new FormControl(0),
      contaFixa: new FormControl(0),
      categoria: new FormControl(null, Validators.required),
      tipoMovimentacao: new FormControl(1, Validators.required),
      pessoa: new FormControl({ id: pessoa.id }),
      repetir: new FormControl(0),
    });
  }

  setForm(): void {
    if (
      this.operation === Operation.EDIT ||
      this.operation === Operation.VIEW
    ) {
      this._loadingService.show();
      this._financialMovementService.loadOne(this.id).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {

          if (!response) {
            return;
          }

          Object.keys(response).forEach(key => {
            if (['dtConta', 'dtLembrete', 'dtConclusao'].includes(key) && response[key]) {

              const [year, month, day] = response[key].split('-');
              response[key] = new Date(year, month - 1, day);
            }
          });

          this.form.patchValue(response);
          const { categoria, tipoMovimentacao, pessoa, concluido } = response;
          this.form.get('categoria').setValue(categoria.id);
          this.form.get('tipoMovimentacao').setValue(tipoMovimentacao.id);
          this.form.get('pessoa').setValue(pessoa.id);

          if (this.operation === Operation.VIEW) {
            this.form.disable();
          } else if (this.operation === Operation.EDIT) {
            this.form.get('repetir').disable();
            this.form.get('contaFixa').disable();
          }

          this.onChangeConcluidoToggleButton(concluido);
          this._loadingService.hide();
        },
        (err) => {
          console.log(err);
          this._loadingService.hide();
        }
      );
    }
  }

  onSave(): void {
    this._loadingService.show();
    if (this.form.dirty) {
      if (this.form.get('concluido').value) {
        this.form
          .get('dtConclusao')
          .setValue(
            moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD')
          );
      }
      if (this.operation === Operation.NEW) {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    }
  }

  onCreate(): void {
    const { repetir } = this.form.value;
    const qtdVezes = Number(repetir) ? Number(repetir) : 1;
    let formAux: any = Array.from({ length: qtdVezes }).map(
      () => new FormGroup(this.form.controls)
    );

    formAux = formAux.map((fa, i) => {
      const dtConta = moment
        .tz(fa.get('dtConta').value, 'America/Sao_Paulo')
        .add(i, 'month')
        .format('YYYY-MM-DD');

      const dtLembrete = fa.get('dtLembrete').value
        ? moment
          .tz(fa.get('dtLembrete').value, 'America/Sao_Paulo')
          .add(i, 'month')
          .format('YYYY-MM-DD')
        : null;

      return { ...fa.value, dtConta, dtLembrete };
    });

    this._financialMovementService.create(formAux).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this._loadingService.hide();
          this._router.navigate(['..'], { relativeTo: this._activatedRoute });
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  onUpdate(): void {
    this._financialMovementService
      .update(this.form.value.id, this.form.value)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          if (response) {
            this._loadingService.hide();
            this._router.navigate(['../..'], {
              relativeTo: this._activatedRoute,
            });
          }
        },
        (error) => {
          console.log(error);
          this._loadingService.hide();
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

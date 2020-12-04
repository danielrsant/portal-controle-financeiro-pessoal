import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

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
  accounts$: Observable<any[]>;

  movementTypeParams = {
    title: 'Receita',
    statusAccount: 'Recebido',
    fixedAccount: 'Receita fixa',
  };

  dtHoje = new Date();

  destroy$ = new Subject();

  repetitionType = [
    { id: 1, descricao: 'Único' },
    { id: 2, descricao: 'Todo mês' },
    { id: 3, descricao: 'Parcelado' },
  ]

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _financialMovementService: FinancialMovementService,
    private _categoryService: CategoryService,
    private _movementTypeService: MovementTypeService,
    private _accountService: AccountService,
    private _dashboardService: DashboardService,
    private _loadingService: LoadingService,
    private _currencyPipe: CurrencyPipe,
    private _toastr: ToastrService,
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.onRefresh();
    this.setParamsAccount();
    this.setForm();
  }

  onRefresh(): void {
    this.categories$ = this._categoryService.loadAll({ filter: 'status||$eq||1' });
    this.movementTypes$ = this._movementTypeService.loadAll();
    this.accounts$ = this._accountService.loadAll();
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

    if (value) {
      this.form.get('dtConclusao').enable();
      const date = this.form.get('dtConclusao').value ? this.form.get('dtConclusao').value : new Date();
      this.form.get('dtConclusao').setValue(date);
    } else {
      this.form.get('dtConclusao').disable();
    }

    if (this.form.controls.dtLembrete.invalid) {
      this._toastr.error('A data de lembrete é menor que a data atual');
    }
  }

  onChangeSelectRepetitionType(value): void {
    switch (value) {
      case 1:
        this.form.get('contaFixa').setValue(0);
        this.form.get('repetir').setValue(0);
        this.form.get('repetir').disable();
        break;
      case 2:
        this.form.get('contaFixa').setValue(1);
        this.form.get('repetir').setValue(0);
        this.form.get('repetir').disable();
        break;
      case 3:
        this.form.get('contaFixa').setValue(0);
        this.form.get('repetir').enable();
        break;
    }
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

    params.filter = 'status||$eq||1';
    this.categories$ = this._categoryService.loadAll(params);
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
      dtConclusao: new FormControl({ value: null, disabled: true }),
      dtLembrete: new FormControl(null),
      concluido: new FormControl(0),
      contaFixa: new FormControl(0),
      categoria: new FormControl(null, Validators.required),
      tipoMovimentacao: new FormControl(1, Validators.required),
      conta: new FormControl(null, Validators.required),
      pessoa: new FormControl({ id: pessoa.id }),
      repetir: new FormControl({ value: 0, disabled: true }),
      tipoRepeticao: new FormControl(1, Validators.required)
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
              response[key] = moment.tz(new Date(year, month - 1, day), 'America/Sao_Paulo').toDate();
            }
          });

          const { categoria, tipoMovimentacao, pessoa, concluido, conta, contaFixa } = response;

          this.onChangeConcluidoToggleButton(concluido);
          this.onChangeSelectRepetitionType(contaFixa ? contaFixa : 1);
          this.form.patchValue(response);
          this.form.get('categoria').setValue(categoria.id);
          this.form.get('tipoMovimentacao').setValue(tipoMovimentacao.id);
          this.form.get('pessoa').setValue(pessoa.id);
          this.form.get('conta').setValue(conta.id);

          if (this.operation === Operation.VIEW) {
            this.form.disable();
          } else if (this.operation === Operation.EDIT) {
            this.form.get('repetir').disable();
            this.form.get('contaFixa').disable();
          }

          this._loadingService.hide();
        },
        (err) => {
          this._toastr.error(err);
          this._loadingService.hide();
        }
      );
    }
  }

  checkLimiteCategoria(id): void {
    if (id && this.form.get('tipoMovimentacao').value === 2) {
      this._loadingService.show();
      this._categoryService.loadOne(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          this._loadingService.hide();
          if (!response) {
            return;
          }

          this._loadingService.show();
          this._dashboardService.getTotalByCategory(id).subscribe(res => {
            this._loadingService.hide();
            if (!res) {
              return;
            }

            const { descricao, limite } = response;
            const { total } = res;

            if (parseFloat(total) === parseFloat(limite)) {
              this._toastr.warning(`Você atingiu o limite de ${this._currencyPipe.transform(limite, 'BRL')} na categoria ${descricao}!`);
            } else if (parseFloat(total) > parseFloat(limite)) {
              this._toastr.warning(`Você ultrapassou o limite de ${this._currencyPipe.transform(limite, 'BRL')} na categoria ${descricao}!`);
            }

            if (this.operation === Operation.NEW) {
              this._router.navigate(['..'], { relativeTo: this._activatedRoute });
            }

            if (this.operation === Operation.EDIT) {
              this._router.navigate(['../..'], {
                relativeTo: this._activatedRoute,
              });
            }
          }, err => {
            this._loadingService.hide();
            this._toastr.error(err);
          });
        }, err => {
          this._loadingService.hide();
          this._toastr.error(err);
        });
    } else {
      if (this.operation === Operation.NEW) {
        this._router.navigate(['..'], { relativeTo: this._activatedRoute });
      }

      if (this.operation === Operation.EDIT) {
        this._router.navigate(['../..'], {
          relativeTo: this._activatedRoute,
        });
      }
    }
  }

  onSave(): void {
    this._loadingService.show();

    const { dtConclusao } = this.form.controls;

    if (dtConclusao.disabled) {
      dtConclusao.setValue(null);
    }

    if (this.form.dirty) {
      if (this.operation === Operation.NEW) {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    }
  }

  onCreate(): void {
    const { repetir } = this.form.value;
    const qtdVezes = Number(repetir) ? Number(repetir) === 1 ? 2 : Number(repetir) : 1;
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
          this._toastr.success('Registro salvo com sucesso!');
          this._loadingService.hide();
          this.checkLimiteCategoria(this.form.get('categoria').value);
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  onUpdate(): void {
    this.form.enable();
    this._financialMovementService
      .update(this.form.value.id, this.form.value)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          if (response) {
            this._loadingService.hide();
            this.checkLimiteCategoria(this.form.get('categoria').value);
          }
        },
        (error) => {
          this._toastr.error(error.error.message);
          this._loadingService.hide();
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

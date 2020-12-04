import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

import { LoadingService } from '../../../../shared/components/several-components/loading/loading.service';
import { AccountTypeService } from './../../../../services/account-type.service';
import { FinancialInstitutionService } from './../../../../services/financial-institution.service';
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
  icon = 'account_balance_wallet';
  operation: Operation;

  form: FormGroup;

  accountTypes$: Observable<any[]>;
  financialInstutionals$: Observable<any[]>;

  dtHoje = new Date();

  destroy$ = new Subject();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _accountService: AccountService,
    private _accountTypeService: AccountTypeService,
    private _financialInstutionalService: FinancialInstitutionService,
    private _loadingService: LoadingService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.onRefresh();
    this.setForm();
  }

  onRefresh(): void {
    this.accountTypes$ = this._accountTypeService.loadAll();
    this.financialInstutionals$ = this._financialInstutionalService.loadAll();
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
          ? 'Alterando Conta'
          : 'Visualizando Conta';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Conta';
    }
  }

  createForm(): void {
    const pessoa = JSON.parse(localStorage.getItem('user'));
    this.form = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      incluirSoma: new FormControl(1),
      tipoConta: new FormControl(null, Validators.required),
      instituicaoFinanceira: new FormControl(null, Validators.required),
      pessoa: new FormControl({ id: pessoa.id }),
    });
  }

  setForm(): void {
    if (
      this.operation === Operation.EDIT ||
      this.operation === Operation.VIEW
    ) {
      this._loadingService.show();
      this._accountService.loadOne(this.id).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {

          if (!response) {
            return;
          }

          this.form.patchValue(response);
          const { tipoConta, instituicaoFinanceira, pessoa } = response;
          this.form.get('tipoConta').setValue(tipoConta.id);
          this.form.get('instituicaoFinanceira').setValue(instituicaoFinanceira ? instituicaoFinanceira.id : null);
          this.form.get('pessoa').setValue(pessoa.id);

          if (this.operation === Operation.VIEW) {
            this.form.disable();
          }

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
    if (this.operation === Operation.NEW) {
      this.onCreate();
    } else {
      this.onUpdate();
    }
  }

  onCreate(): void {
    this._accountService.create(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this._toastr.success('Registro salvo com sucesso!');
        this._loadingService.hide();
        this._router.navigate(['..'], { relativeTo: this._activatedRoute });
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  onUpdate(): void {
    this.form.enable();
    this._accountService
      .update(this.form.value.id, this.form.value)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this._loadingService.hide();
          this._router.navigate(['../..'], { relativeTo: this._activatedRoute });
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

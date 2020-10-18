import { ObjectiveService } from './../../../../services/objective.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FinancialMovementService } from '../../../../services/financial-movement.service';
import { LoadingService } from '../../../../shared/components/several-components/loading/loading.service';
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

  dtHoje = new Date();

  destroy$ = new Subject();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _objectiveService: ObjectiveService,
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
          ? 'Alterando Objetivo'
          : 'Visualizando Objetivo';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Objetivo';
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
      total: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      dtConclusao: new FormControl(null, Validators.required),
      pessoa: new FormControl({ id: pessoa.id }),
    });
  }

  setForm(): void {
    if (
      this.operation === Operation.EDIT ||
      this.operation === Operation.VIEW
    ) {
      this._loadingService.show();
      this._objectiveService.loadOne(this.id).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {

          this._loadingService.hide();

          if (!response) {
            return;
          }

          this.form.patchValue(response);

          this.form.disable();
        },
        (err) => {
          this._toastr.error(err);
          this._loadingService.hide();
        }
      );
    }
  }

  onSave(): void {
    this._loadingService.show();

    if (this.form.dirty) {
      if (this.operation === Operation.NEW) {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    }
  }

  onCreate(): void {
    this._objectiveService.create(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this._loadingService.hide();
        this._router.navigate(['..'], { relativeTo: this._activatedRoute });
      },
      (error) => {
        this._loadingService.hide();
        this._toastr.error(error);
      }
    );
  }

  onUpdate(): void {
    this.form.enable();
    this._objectiveService
      .update(this.form.value.id, this.form.value)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this._loadingService.hide();
          this._router.navigate(['../..'], {
            relativeTo: this._activatedRoute,
          });
        },
        (error) => {
          this._toastr.error(error);
          this._loadingService.hide();
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

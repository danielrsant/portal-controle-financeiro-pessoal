import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FinancialMovementService } from '../../../../services/financial-movement.service';
import { MovementTypeService } from '../../../../services/movement-type.service';
import { LoadingService } from '../../../../shared/components/several-components/loading/loading.service';
import { CategoryService } from './../../../../services/category.service';
import { Operation } from './../../../../shared/enums/operation';
import * as moment from 'moment-timezone';

// tslint:disable: variable-name

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {

  id: number;
  title: string;
  icon = 'home';
  operation: Operation;

  form: FormGroup;

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

  ngAfterViewInit() {
    this.setForm();
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
    const pessoa = JSON.parse(localStorage.getItem('user'));
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
      pessoa: new FormControl({ id: pessoa.id }),
    });
  }

  setForm(): void {
    if (this.operation === Operation.EDIT || this.operation === Operation.VIEW) {
      this._loadingService.show();
      this._financialMovementService.loadOne(this.id)
        .subscribe((response: any) => {
          this.form.patchValue(response);
          const { categoria, tipoMovimentacao, pessoa } = response;
          this.form.get('categoria').setValue(categoria.id);
          this.form.get('tipoMovimentacao').setValue(tipoMovimentacao.id);
          this.form.get('pessoa').setValue(pessoa.id);

          if (this.operation === Operation.VIEW) {
            this.form.disable();
          }
          this._loadingService.hide();
        }, (err) => {
          console.log(err);
          this._loadingService.hide();
        });
    }
  }

  onSave(): void {
    this._loadingService.show();
    if (this.form.dirty) {
      if (this.form.get('pago').value) { this.form.get('dtConclusao').setValue(moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD')); }
      if (this.operation === Operation.NEW) {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    }
  }

  onCreate(): void {
    this._financialMovementService.create(this.form.value).subscribe((response: any) => {
      if (response) {
        this._loadingService.hide();
        this._router.navigate(['..'], { relativeTo: this._activatedRoute });
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
        this._loadingService.hide();
        this._router.navigate(['../..'], { relativeTo: this._activatedRoute });
      }
    },
      error => {
        console.log(error);
        this._loadingService.hide();
      }
    );
  }


  ngOnDestroy(): void {
  }

}

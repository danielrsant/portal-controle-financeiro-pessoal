import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { isThisSecond } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { PlannerService } from './../../../../services/planner.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {

  smallScreen: boolean;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _loadingService: LoadingService,
    private _plannerService: PlannerService,
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private _toastr: ToastrService
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches; 
    });
  }

  title = 'Planejamento';
  icon = 'card_travel';
  operation: Operation = Operation.INDEX;

  options: any = {};

  destroy$ = new Subject();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  data = null;
  categoriasSelecionadas = [];
  categorias = [];

  form: FormGroup;
  formAux: FormGroup;

  percentualDespesa = 0;

  totalCategorias = 0;

  ngOnInit(): void {
    this.createForm();
    this.setForm();
    this.loadCategorias();
    this.onChangeValueCategoria();
  }

  loadCategorias(): void {
    this._loadingService.show();
    this._categoryService.loadAll().pipe(takeUntil(this.destroy$)).subscribe((resp: any) => {
      this.categorias = resp.data;
      return resp.data;
    });
  }

  createForm(): void {
    const pessoa = JSON.parse(localStorage.getItem('user'));
    this.form = this._formBuilder.group({
      id: new FormControl(null),
      pessoa: new FormControl({ id: pessoa.id }),
      receitaMensal: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      categorias: new FormArray([]),
    });

    this.formAux = this._formBuilder.group({
      categoriaSelecionada: new FormControl(null, Validators.required),
    });
  }

  onChangeValueCategoria(): void {
    this.form.get('categorias').valueChanges.subscribe((value: any[]) => {
      this.totalCategorias = value.map(v => Number(v.limite)).reduce((pv, cv) => pv + cv, 0);
    });
  }

  onSelectCategoria(categoriaId): void {
    const categorias = this.form.get('categorias') as FormArray;
    const categoria = this.categorias.find(c => c.id === categoriaId);

    this.categoriasSelecionadas = this.categoriasSelecionadas.filter(c => c.id !== categoria.id);
    const index = categorias.controls.findIndex(c => c.value.id === categoria.id);

    if (index !== -1) {
      categorias.removeAt(index);
    }

    if (categoria) {
      this.categoriasSelecionadas.push(categoria);
    }

    categorias.push(new FormGroup({
      id: new FormControl(categoria.id),
      limite: new FormControl(categoria.limite),
      descricao: new FormControl(categoria.descricao)
    }));

  }


  setForm(): void {
    this._loadingService.show();
    this._plannerService.loadAll().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this._loadingService.hide();
        if (!response || !response.data.length) {
          return;
        }

        const data = response.data[0];
        this.percentualDespesa = data.percentualDespesa;
        this.categoriasSelecionadas = data.categorias;
        this.form.patchValue(data);

        const categorias = this.form.get('categorias') as FormArray;
        data.categorias.forEach(c => {
          categorias.push(new FormGroup({
            id: new FormControl(c.id),
            limite: new FormControl(c.limite),
            descricao: new FormControl(c.descricao)
          }));

          this.formAux.get('categoriaSelecionada').setValue(c.id);
        });
      },
      (err) => {
        console.log(err);
        this._loadingService.hide();
      }
    );
  }

  onSave(): void {
    this._loadingService.show();
    this._plannerService.create(this.form.value).pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this._loadingService.hide();
        if (!response) {
          return;
        }
        this._toastr.success('Registro salvo com sucesso!');
        this.stepper.selectedIndex = 0;
      }, err => {
        this._loadingService.hide();
        console.log(err);
      });
  }

  removeCategoria(categoria): void {
    const index = this.categoriasSelecionadas.indexOf(categoria);
    const categorias = this.form.get('categorias') as FormArray;
    const indexForm = categorias.controls.findIndex(c => c.value.id === categoria.id);

    if (index >= 0 && indexForm >= 0) {
      this.categoriasSelecionadas.splice(index, 1);
      categorias.removeAt(index);
    }

  }

  nextStepper(): void {
    this.stepper.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  id: number;
  title: string;
  icon = 'category';
  operation: Operation;

  form: FormGroup;

  destroy$ = new Subject();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _loadingService: LoadingService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.setForm();
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
          ? 'Alterando Categoria'
          : 'Visualizando Categoria';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Categoria';
    }
  }

  createForm(): void {
    const pessoa = JSON.parse(localStorage.getItem('user'));

    this.form = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, [
        Validators.required,
        Validators.maxLength(80),
      ]),
      // limite: new FormControl(null),
      status: new FormControl(1),
      pessoa: new FormControl({ id: pessoa.id }),
    });
  }

  setForm(): void {
    if (
      this.operation === Operation.EDIT ||
      this.operation === Operation.VIEW
    ) {
      this._loadingService.show();
      this._categoryService.loadOne(this.id).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this.form.patchValue(response);

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
    this._categoryService.create(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this._toastr.success('Registro salvo com sucesso!');
          this._loadingService.hide();
          this._router.navigate(['..'], { relativeTo: this._activatedRoute });
        }
      },
      (error) => {
        this._toastr.error(error.error.message);
        this._loadingService.hide();
      }
    );
  }

  onUpdate(): void {
    this._categoryService.update(this.form.value.id, this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
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

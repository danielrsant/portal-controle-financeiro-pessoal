import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/shared/enums/operation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {
  id: number;
  title: string;
  icon = 'home';
  operation: Operation;

  form: FormGroup;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
  }

  ngAfterViewInit(): void {
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
      this._categoryService.loadOne(this.id).subscribe(
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
    this._categoryService.create(this.form.value).subscribe(
      (response: any) => {
        if (response) {
          this._loadingService.hide();
          this._router.navigate(['..'], { relativeTo: this._activatedRoute });
        }
      },
      (error) => {
        console.log(error);
        this._loadingService.hide();
      }
    );
  }

  onUpdate(): void {
    this._categoryService.update(this.form.value.id, this.form.value).subscribe(
      (response: any) => {
        this._loadingService.hide();
        this._router.navigate(['../..'], { relativeTo: this._activatedRoute });
      },
      (error) => {
        console.log(error);
        this._loadingService.hide();
      }
    );
  }

  ngOnDestroy(): void {}
}

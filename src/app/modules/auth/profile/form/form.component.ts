import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {

  title: 'Perfil';
  icon = 'account_circle';

  operation: Operation;

  form: FormGroup;
  dtToday = new Date();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.setForm();
  }

  setOperation(): void {
    this.operation = Operation.EDIT;
    this.title = 'Perfil';
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      image: new FormControl(null),
      descricao: new FormControl(null, [
        Validators.required,
        Validators.maxLength(80),
      ]),
      nome: new FormControl(null, Validators.required),
      sobrenome: new FormControl(null, Validators.required),
      dtNascimento: new FormControl(null, Validators.required),
      celular: new FormControl(null, Validators.required),
      status: new FormControl(1),
    });
  }

  setForm(): void {
    this._loadingService.show();
    this._categoryService.loadOne(1).subscribe(
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

  insertedFile(value): void {
    console.log(value);
  }

  onSave(): void {
    this.onUpdate();
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

  ngOnDestroy(): void { }
}

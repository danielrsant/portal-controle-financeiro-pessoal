import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { StyleService } from 'src/app/shared/services/style.service';

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

  images = ['assets/images/users/1.png', 
    'assets/images/users/2.png', 
    'assets/images/users/3.png', 
    'assets/images/users/4.png', 
    'assets/images/users/5.png', 
    'assets/images/users/6.png', 
    'assets/images/users/7.png', 
    'assets/images/users/8.png'
  ];
  imageSelected$: Observable<string>;
  imageSelected: string;

  destroy$ = new Subject();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _profileService: ProfileService,
    private _loadingService: LoadingService,
    private _styleService: StyleService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.imageSelected$ = this._styleService.image$;
    this.imageSelected$.pipe(takeUntil(this.destroy$)).subscribe(data => this.imageSelected = data);
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
      nome: new FormControl(null, Validators.required),
      sobrenome: new FormControl(null, Validators.required),
      dtNascimento: new FormControl(null, Validators.required),
      celular: new FormControl(null, Validators.required),
      status: new FormControl(1),
    });
  }

  setForm(): void {
    this._loadingService.show();
    this._profileService.loadUser().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.form.patchValue(response.data[0]);

        if (this.operation === Operation.VIEW) {
          this.form.disable();
        }

        this._loadingService.hide();
      },
      (err) => {
        this._toastr.error(err.error.message);
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
    const payload = this.form.value;
    this._profileService.save(payload).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this._toastr.success('Perfil atualizado com sucesso!');
      },
      (error) => {
        this._toastr.error(error.error.message);
        this._loadingService.hide();
      }
    );
  }

  selectImage(image): void {
    this._styleService.setImage(image);
  }

  ngOnDestroy(): void { 
    this.destroy$.next();
    this.destroy$.complete();
  }
}

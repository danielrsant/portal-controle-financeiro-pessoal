import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { sharedAnimations } from 'src/app/shared/animations';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: sharedAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    form: FormGroup;
    formPerson: FormGroup;
    dtToday = new Date();

    onDestroy$ = new Subject<boolean>();

    constructor(
        private _authenticationService: AuthenticationService,
        private _loading: LoadingService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[@][a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[.][a-zA-Z]{2,4}){0,1}$')]),
            senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmarSenha: new FormControl('', [Validators.required, confirmPasswordValidator, Validators.minLength(8)]),
            status: new FormControl(1)
        });
        this.formPerson = new FormGroup({
            nome: new FormControl(null, Validators.required),
            sobrenome: new FormControl(null, Validators.required),
            dtNascimento: new FormControl(null, Validators.required),
            celular: new FormControl(null, Validators.required),
        });
    }

    onRegister(): void {
        const payload = { ...this.form.value, ...{ pessoa: this.formPerson.value } };
        this._loading.show();
        this._authenticationService.register(payload).pipe(takeUntil(this.onDestroy$)).subscribe(response => {
            if (response) {
                this._router.navigate([`../login`], { relativeTo: this._activatedRoute });
                this._toastr.success('Conta criada com Sucesso!');
            }
            this._loading.hide();
        },
            error => {
                this._loading.hide();
                this._toastr.error(error.error.message);
            });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};

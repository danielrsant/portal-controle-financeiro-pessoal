import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { sharedAnimations } from 'src/app/shared/animations';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: sharedAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    form: FormGroup;
    dtToday = new Date();

    onDestroy$ = new Subject<boolean>();

    constructor(
        private _authenticationService: AuthenticationService,
        private _loading: LoadingService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            nome: new FormControl(null),
            sobrenome: new FormControl(null),
            dtNascimento: new FormControl(null),
            email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[@][a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[.][a-zA-Z]{2,4}){0,1}$')]),
            senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmarSenha: new FormControl('', [Validators.required, confirmPasswordValidator, Validators.minLength(8)]),
            status: new FormControl(1)
        });
    }

    onRegister(): void {
        this._loading.show();
        this._authenticationService.register(this.form.value).pipe(takeUntil(this.onDestroy$)).subscribe(response => {
            if (response) {
                console.log(response);
            }
            this._loading.hide();
        },
            error => {
                this._loading.hide();
                console.log(error);
            });
    }

    ngOnDestroy() {
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

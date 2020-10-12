import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { sharedAnimations } from 'src/app/shared/animations';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    animations: sharedAnimations
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    token: string;

    form: FormGroup;
    onDestroy$ = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        // this.getToken();
        this.createForm();
    }

    getToken() {
        const urlToken = this._activatedRoute.snapshot.params.token;
        this.token = urlToken ? urlToken : null;
    }

    createForm() {
        this.form = this._formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator, Validators.minLength(8)]]
        });

        this.form.get('password').valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
            this.form.get('passwordConfirm').updateValueAndValidity();
        });
    }

    onReset() {
        // this._loadingService.show();
        // const payload = { password: this.form.value.password, token: this.token };
        // this._authenticationService.reset(payload).pipe(takeUntil(this.onDestroy$)).subscribe(data => {
        //     this._loadingService.hide();
        //     this._swalService.success('Senha redefinida com sucesso!');
        //     this._router.navigate(['/login']);
        // },
        //     error => {
        //         this._loadingService.hide();
        //         this._swalService.error(error.error.message);
        //     })
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

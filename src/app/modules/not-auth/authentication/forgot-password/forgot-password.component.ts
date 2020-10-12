import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { sharedAnimations } from 'src/app/shared/animations';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: sharedAnimations
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    public version = VERSION.full;
    
    form: FormGroup;

    onDestroy$ = new Subject<boolean>();

    constructor(
        // private _loginService: LoginService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[@][a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[.][a-zA-Z]{2,4}){0,1}$')]),
        });
    }


    verifyEmail(): void {
        // this._loadingService.show();
        // this._loginService.forgot(this.form.value.email).pipe(takeUntil(this.onDestroy$)).subscribe(data => {
        //     this._loadingService.hide();
        //     this._swalService.success('E-mail para redefinição de senha enviado com sucesso!');
        //     this._router.navigate(['/login']);
        // },
        //     error => {
        //         this._loadingService.hide();
        //         this._swalService.error(error.error.message);
        //     })
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}

import { AUTO_STYLE } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { sharedAnimations } from 'src/app/shared/animations';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';

import { ModalComponent } from './components/select-example-modal/modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: sharedAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
    form: FormGroup;
    versionApi: any = {};

    onDestroy$ = new Subject<boolean>();

    constructor(
        private _authenticationService: AuthenticationService,
        private _loading: LoadingService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _toastrService: ToastrService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[@][a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[.][a-zA-Z]{2,4}){0,1}$')]),
            senha: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    onLogin(): void {
        this._loading.show();
        this._authenticationService.login(this.form.value.email, this.form.value.senha).pipe(takeUntil(this.onDestroy$)).subscribe(
            response => {
                if (response) {
                    localStorage.setItem('user', JSON.stringify({ ...response.data.pessoa, ...{ email: response.data.email } }));
                    localStorage.setItem('token', response.token);
                    this.navigate();
                    if (!localStorage.getItem('custom')) {
                        this.openDialog();
                    }
                } else {
                    this._toastrService.error('E-mail inexistente!');
                }
                this._loading.hide();
            },
            error => {
                this._loading.hide();
                this._toastrService.error(error.error.message);
            });
    }

    navigate(): void {
        this._router.navigate([`../auth/dashboard`], { relativeTo: this._activatedRoute });
    }

    openDialog(): void {
        localStorage.setItem('custom', 'true');
        const dialogRef = this.dialog.open(ModalComponent, {
            maxHeight: '80vh',
            maxWidth: '90%',
            height: AUTO_STYLE,
            width: window.innerWidth < 900 ? '90%' : '50%',
            data: null,
            panelClass: 'custom-dialog-container'
        }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(data => {
            console.log(data);
        });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}

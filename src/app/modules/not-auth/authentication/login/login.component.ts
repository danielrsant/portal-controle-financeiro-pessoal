import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { sharedAnimations } from 'src/app/shared/animations';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { takeUntil } from 'rxjs/operators';

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
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[@][a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[.][a-zA-Z]{2,4}){0,1}$')]),
            senha: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    onLogin() {
        this._loading.show();
        this._authenticationService.login(this.form.value.email, this.form.value.senha).pipe(takeUntil(this.onDestroy$)).subscribe(
            response => {
            if (response) {
                console.log(response);
                localStorage.setItem('user', JSON.stringify(response.data.pessoa));
                localStorage.setItem('token', response.data.accessToken);
                this.navigate();
            }
            this._loading.hide();
        },
            error => {
                this._loading.hide();
                console.log(error);
            });
    }

    navigate(): void {

    }

    openDialog(examples) {
        // const dialogRef = this.dialog.open(SelectExampleModalComponent, {
        //     maxHeight: '80vh',
        //     height: AUTO_STYLE,
        //     width: '50%',
        //     data: { examples }
        // }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(data => {
        //     console.log(data)
        // })
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}

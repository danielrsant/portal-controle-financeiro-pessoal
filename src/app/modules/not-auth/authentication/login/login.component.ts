import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { sharedAnimations } from 'src/app/shared/animations';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';

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
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    onLogin() {
        // this._loading.show();
        // this._authenticationService.auth(this.form.value).pipe(takeUntil(this.onDestroy$)).subscribe(response => {
        //     if (response) {
        //         const user = response.data.person;
        //         delete user.id;
        //         localStorage.setItem('user', JSON.stringify(user));
        //         localStorage.setItem('token', response.data.accessToken);
        //         this.verifyPermissions(response.data.accessToken);
        //     }
        //     this._loading.hide();
        // },
        //     error => {
        //         this._loading.hide();
        //         if (error.error.status === 403) {
        //             this._swalService.error('Dados inválidos!');
        //         } else {
        //             if (error.error.error) {
        //                 this._swalService.error(error.error.error.message);
        //             } else {
        //                 this._swalService.error(error.error.message);
        //             }
        //         }
        //     });
    }

    verifyPermissions(token) {
        // this._loading.show();
        // this._menuService.verifyToken({token}).pipe(takeUntil(this.onDestroy$)).subscribe((response: any) => {
        //     if (response.tokenStatus) {
        //         this._menuService.loadByPerson().pipe(takeUntil(this.onDestroy$)).subscribe((response: any) => {
        //             if (response) {
        //                 const haveDashboard = response.data.find(element => element.title === 'Dashboard');
        //                 if (haveDashboard) {
        //                     this._router.navigate(['../auth/admin/dashboard/servicos']);
        //                 } else {
        //                     this._router.navigate(['../home']);
        //                 }
        //             }
        //             this._loading.hide();
        //         }, error => {
        //             this._loading.hide();
        //             this._swalService.error('Erro ao buscar permissões!');
        //         });
        //     }
        // })
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

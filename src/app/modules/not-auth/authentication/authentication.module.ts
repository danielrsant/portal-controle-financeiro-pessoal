import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SelectExampleModalComponent } from './login/components/select-example-modal/select-example-modal.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'esqueceu-senha',
        component: ForgotPasswordComponent
    },
    {
        path: 'resetar-senha',
        component: ResetPasswordComponent
    },
    {
        path: 'resetar-senha/:token',
        component: ResetPasswordComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SelectExampleModalComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    entryComponents: [
        SelectExampleModalComponent
    ]
})
export class AuthenticationModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ModalComponent } from './login/components/select-example-modal/modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path: 'cadastrar',
        component: RegisterComponent
    },
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
        RegisterComponent,
        ResetPasswordComponent,
        ModalComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    entryComponents: [
        ModalComponent
    ]
})
export class AuthenticationModule {
}

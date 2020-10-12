import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Error401Component } from './error-401.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes = [
    {
        path: '',
        component: Error401Component
    }
];

@NgModule({
    declarations: [
        Error401Component
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class Error401Module {
}

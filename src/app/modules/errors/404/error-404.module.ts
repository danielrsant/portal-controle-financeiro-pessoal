import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { Error404Component } from './error-404.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes = [
    {
        path: '',
        component: Error404Component
    }
];

@NgModule({
    declarations: [
        Error404Component
    ],
    imports: [
        MatIconModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class Error404Module {
}

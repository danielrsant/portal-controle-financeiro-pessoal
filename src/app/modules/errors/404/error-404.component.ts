import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'error-404',
    templateUrl: './error-404.component.html',
    styleUrls: ['./error-404.component.scss'],
})
export class Error404Component {

    constructor(private location: Location) { }

    backPage() {
        this.location.back();
    }
}

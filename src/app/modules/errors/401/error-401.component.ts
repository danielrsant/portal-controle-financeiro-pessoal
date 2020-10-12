import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector     : 'error-401',
    templateUrl  : './error-401.component.html',
    styleUrls    : ['./error-401.component.scss'],
})
export class Error401Component {

    constructor(private location: Location) { }

    backPage() {
        this.location.back();
    }
}

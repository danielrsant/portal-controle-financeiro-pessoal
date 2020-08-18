import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor( ) { }

    private _isShow: boolean = false;

    show(){
        setTimeout(() => {
            this._isShow = true;
        }, 10);
    }

    hide(){
        setTimeout(() => {
            this._isShow = false;
        }, 10);
    }

    getStatus(): boolean{
        return this._isShow;
    }
}
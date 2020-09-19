import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomizeInputsService {

  private dataSource = new BehaviorSubject<any>(localStorage.getItem('theme-input') ? localStorage.getItem('theme-input') : 'outline');
  appearance = this.dataSource.asObservable();

  constructor() { }

  setTheme(appearance) {
    localStorage.setItem('theme-input', appearance);
    this.dataSource.next(appearance);
  }
}

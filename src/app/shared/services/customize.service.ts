import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {

  private dataSource = new BehaviorSubject<any>(localStorage.getItem('theme'));
  theme = this.dataSource.asObservable();

  constructor() {}

  setTheme(theme): void {
    this.dataSource.next(theme);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesDataService {

  private employeesSource = new BehaviorSubject({ employee: null, key: '' });
  currentEmployee = this.employeesSource.asObservable();

  constructor() { }

  getEmployee(employee: Employee, key: string) {
    this.employeesSource.next({ employee, key });
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  constructor(private _angularFireDatabase: AngularFireDatabase) { }

  getAll(): Employee {
    // this._angularFireDatabase.list()
  }
  
  insert() {

  }

  update() {
    
  }

  delete() {

  }
}

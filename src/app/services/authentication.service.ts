import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API_BASE_URL: string = environment.API;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loadPerson(id?: any): Observable<any[]> {
    const url = `${this.API_BASE_URL}/person/${id}`;

    return this.http.get(url, { params: id }).pipe(map((result: any) => result));
  }

  login(username: string, password: string): Observable<any> {
    const url = `${environment.API}/usuarios/login`;

    return this.http.post<any>(url, { username, password }).pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(payload: any): Observable<any> {
    const url = `${environment.API}/usuarios/cadastro`;

    return this.http.post<any>(url, payload);
  }

  forgot(email: string): Observable<any> {
    const url = `${environment.API}/usuarios/recuperar-senha`;

    return this.http.post<any>(url, { email });
  }

  reset(payload: any): Observable<any> {
    const url = `${environment.API}/usuarios/resetar-senha`;

    return this.http.post<any>(url, payload);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

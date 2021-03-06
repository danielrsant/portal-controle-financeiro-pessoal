import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_BASE_URL: string = environment.API;
  pessoaId = JSON.parse(localStorage.getItem('user')).id;

  constructor(private http: HttpClient) { }

  loadUser(payload?: any): Observable<any[]> {
    const url = `${this.API_BASE_URL}/pessoas?filter=id||$eq||${this.pessoaId}`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  save(payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/pessoas/${payload.id}`;

    return this.http.put(url, payload);
  }

}

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  API_BASE_URL: string = environment.API;
  pessoaId = JSON.parse(localStorage.getItem('user')).id;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<any[]> {
    let url = `${this.API_BASE_URL}/contas?filter=pessoa.id||$eq||${this.pessoaId}`;

    if (payload && payload.filter) {
      url += `&${payload.filter}`;
    }

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/contas/${id} `;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  create(payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/contas`;

    return this.http.post(url, payload);
  }

  update(id: number, payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/contas/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }

  destroy(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/contas/${id}`;

    return this.http
      .put(url, {
        status: 0,
      })
      .pipe(map((result: any) => result));
  }
}

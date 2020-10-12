import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {
  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<any[]> {
    const url = `${this.API_BASE_URL}/tipo-contas`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/tipo-contas/${id} `;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  create(payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/tipo-contas`;

    return this.http.post(url, payload);
  }

  update(id: number, payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/tipo-contas/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }

  destroy(id: number): boolean {
    return;
  }
}

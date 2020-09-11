import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovementTypeService {

  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<any[]> {
    const url = `${this.API_BASE_URL}/tipos-movimentacao`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/tipos-movimentacao/${id}`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  create(payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/tipos-movimentacao`;

    return this.http.post(url, payload);
  }

  update(id: number, payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/tipos-movimentacao/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }

  destroy(id: number): boolean {
    return;
  }
}

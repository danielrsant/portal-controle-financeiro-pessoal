import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinancialMovementService {

  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(pessoaId: number, payload?: any): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes`;
    if (!payload.filter) {
      payload.filter = [];
    }

    payload.filter[0] = `pessoa.id||$eq||${pessoaId}`;
    payload.filter[1] = `status||$eq||1`;


    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number, pessoaId: number): Observable<any> {
    const url = `${this.API_BASE_URL}/movimentacoes/${id}`;
    const payload: any = {};
    if (!payload.filter) {
      payload.filter = [];
    }

    payload.filter[0] = `pessoa.id||$eq||${pessoaId}`;
    payload.filter[1] = `status||$eq||1`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  create(payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/movimentacoes`;

    return this.http.post(url, payload);
  }

  update(id: number, payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/movimentacoes/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result));
  }

  destroy(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/movimentacoes/${id}`;

    return this.http.put(url, {
      status: 0
    }).pipe(map((result: any) => result));
  }
}

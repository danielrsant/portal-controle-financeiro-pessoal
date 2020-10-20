import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  getExpense(): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes/tipo-movimentacao/2/saldo`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getRevenue(): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes/tipo-movimentacao/1/saldo`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getTotalAccountsReceivable(): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes/tipo-movimentacao/1/nao-concluidas`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getTotalAccountsPayable(): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes/tipo-movimentacao/2/nao-concluidas`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getOverdueBills(): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes/atrasadas`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getBalance(): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes/saldo`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getExpectedBalance(): Observable<any[]> {
    const url = `${this.API_BASE_URL}/movimentacoes/saldo/lancamento-futuro`;

    return this.http.get(url).pipe(map((result: any) => result));
  }
  
  getTotalByCategory(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/movimentacoes/categoria/${id}/total`;
    
    return this.http.get(url).pipe(map((result: any) => result));
  }

  getPieChartData(payload?: any): Observable<any[]> {
    let url = `${this.API_BASE_URL}/movimentacoes/despesas-categoria`;

    if (payload && payload.dtPeriodo1 && payload.dtPeriodo2) {
      url = `${url}?dtPeriodo=${payload.dtPeriodo1}&dtPeriodo=${payload.dtPeriodo2}`;
    }

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getLineChart(payload?: any): Observable<any[]> {
    let url = `${this.API_BASE_URL}/movimentacoes/movimentacoes-tipo-movimentacao`;

    if (payload && payload.dtPeriodo1 && payload.dtPeriodo2) {
      url = `${url}?dtPeriodo=${payload.dtPeriodo1}&dtPeriodo=${payload.dtPeriodo2}`;
    }

    return this.http.get(url).pipe(map((result: any) => result));
  }

  getBarBalance(payload?: any): Observable<any[]> {
    let url = `${this.API_BASE_URL}/movimentacoes/balanco`;

    if (payload && payload.dtPeriodo1 && payload.dtPeriodo2) {
      url = `${url}?dtPeriodo=${payload.dtPeriodo1}&dtPeriodo=${payload.dtPeriodo2}`;
    }
    
    return this.http.get(url).pipe(map((result: any) => result));
  }

  getLimits(payload?: any): Observable<any[]> {
    let url = `${this.API_BASE_URL}/movimentacoes/despesas-categoria`;

    if (payload && payload.dtPeriodo1 && payload.dtPeriodo2) {
      url = `${url}?dtPeriodo=${payload.dtPeriodo1}&dtPeriodo=${payload.dtPeriodo2}`;
    }
  
    return this.http.get(url).pipe(map((result: any) => result));
  }
  
}

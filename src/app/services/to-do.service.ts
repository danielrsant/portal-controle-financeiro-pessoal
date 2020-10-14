import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  API_BASE_URL: string = environment.API;
  pessoaId = JSON.parse(localStorage.getItem('user')).id;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<any[]> {
    let url = `${this.API_BASE_URL}/tarefas?filter=pessoa.id||$eq||${this.pessoaId}`;

    if (payload && payload.filter) {
      url += `&${payload.filter}`;
    }

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<any> {
    const url = `${ this.API_BASE_URL }/tarefas/${ id } `;

    return this.http.get(url).pipe(map((result: any) => result));
  }

  save(payload: any): Observable<any> {
    const url = `${ this.API_BASE_URL }/tarefas`;

    return this.http.post(url, payload);
  }

  destroy(id: number): Observable<any> {
    const url = `${ this.API_BASE_URL }/tarefas/${id}`;

    return this.http.delete(url);
  }

}

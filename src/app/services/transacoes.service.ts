import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transacoes } from '../models/transacoes';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  urlBase = "https://transacoes-financeiras-production.up.railway.app/transacoes";

  constructor(private http: HttpClient) { }

  getTransacoes(): Observable<Transacoes> {
    return this.http.get<Transacoes>(this.urlBase);
  }
  postTransacao(transacao: any): Observable<any>{
    return this.http.post<any>(this.urlBase, transacao);
  }
  deleteTransacao(id: number | undefined): Observable<void>{
    const url: string = this.urlBase + "/" + id;
    return this.http.delete<void>(url);
  }
}

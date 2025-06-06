import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransacaoRequest } from '../types/transacao/transacaoRequest';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  apiUrl: string = "http://localhost:8080/transacoes"

  constructor(private client: HttpClient) { }

  postTransacao(transacao: TransacaoRequest){
    return this.client.post<string>(this.apiUrl, transacao, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
  }

}

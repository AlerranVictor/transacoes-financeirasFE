import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransacaoRequest } from '../types/transacao/transacaoRequest';
import { TransacaoResponse } from '../types/transacao/transacaoResponse';
import { DateRequest } from '../types/transacao/date';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  apiUrl: string = "http://localhost:8080/transacoes"

  constructor(private client: HttpClient) { }

  postTransacao(transacao: TransacaoRequest){
    return this.client.post<string>(this.apiUrl + '/create', transacao, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
  }

  getDatasUsadas(){
    return this.client.get<any[]>(this.apiUrl + '/datas', { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}});
  }

  getTransacoesPorData(data: DateRequest){
    return this.client.post<TransacaoResponse[]>(this.apiUrl, data, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}});
  }

}

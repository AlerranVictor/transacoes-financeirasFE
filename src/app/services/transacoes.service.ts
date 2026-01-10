import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransacaoRequest } from '../types/transacao/transacaoRequest';
import { TransacaoResponse } from '../types/transacao/transacaoResponse';
import { DateRequest } from '../types/transacao/date';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  apiUrl: string = "https://transacoes-financeiras-production.up.railway.app/transacoes"

  constructor(private client: HttpClient) { }

  getSaldo(){
    return this.client.get<number>(this.apiUrl + '/saldo', { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}});
  }

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

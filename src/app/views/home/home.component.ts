import { Component } from '@angular/core';
import { TransacoesService } from 'src/app/services/transacoes.service';
import { DateUtils } from 'src/app/shared/utils/date-utils';
import { DateRequest } from 'src/app/types/transacao/date';
import { TransacaoResponse } from 'src/app/types/transacao/transacaoResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {

  constructor(private transacoes: TransacoesService) {}

  data: Date = new Date;
  ano: number = this.data.getFullYear();
  mes: number = this.data.getMonth() + 1;

  nomeUsuario: string = sessionStorage.getItem('name') || '';
  
  saldo: number = Number(sessionStorage.getItem('balance'));
  lucroMensal: number = Number(sessionStorage.getItem('lucroMensal'));
  despesaMensal: number = Number(sessionStorage.getItem('despesaMensal'));
  receitaMensal: number = Number(sessionStorage.getItem('receitaMensal'));

  mostrarSaldos: boolean = true;

  ngOnInit() {
    this.getSaldoEvaloresSE();
  }

  getSaldoEvaloresSE() {
    if(sessionStorage.getItem('balance') && sessionStorage.getItem('receitaMensal') && sessionStorage.getItem('despesaMensal')) {
      this.getLucroMensal();
      return;
    } else {
      this.transacoes.getSaldo().subscribe(balance => {
        sessionStorage.setItem('balance', balance.toString());
        this.saldo = balance;
        this.getValoresMensais();
      })
    }
  }

  getValoresMensais(){
    this.transacoes.getTransacoesPorData(new DateRequest(this.ano, this.mes)).subscribe((transacoes: TransacaoResponse[]) => {
      sessionStorage.setItem('receitaMensal', transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + Number(t.valor), 0).toString());
      sessionStorage.setItem('despesaMensal', transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + Number(t.valor), 0).toString());
      this.getLucroMensal();
    })
  }

  getLucroMensal(){
    this.lucroMensal = Number(sessionStorage.getItem('receitaMensal')) + Number(sessionStorage.getItem('despesaMensal'));
  }

  attReceitaDespesa(tipoTransacao: "receita" | "despesa", valor: number, data: Date){
    this.attBalance(tipoTransacao, valor);
    if(DateUtils.mesmoMesAno(data, this.mes, this.ano)){
      let valorAtual = Number(sessionStorage.getItem(tipoTransacao.concat('Mensal')) ?? 0) + valor;
      sessionStorage.setItem(tipoTransacao.concat('Mensal'), valorAtual.toString());
      this.getLucroMensal();
    }
  }
  attBalance(tipoTransacao: 'receita' | 'despesa', valor: number){
    let balance = Number(sessionStorage.getItem('balance'));
    if(tipoTransacao === 'despesa'){
      let newBalance = balance - valor;
      sessionStorage.setItem('balance', newBalance.toString());
      this.saldo = newBalance;
      return;
    }
    let newBalance = balance + valor;
    sessionStorage.setItem('balance', newBalance.toString());
    this.saldo = newBalance;
  }
}
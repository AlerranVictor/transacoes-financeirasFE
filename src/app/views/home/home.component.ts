import { Component, OnInit } from '@angular/core';
import { Transacao } from 'src/app/models/transacao';
import { Transacoes } from 'src/app/models/transacoes';
import { TransacoesService } from 'src/app/services/transacoes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  constructor(private transacaoService: TransacoesService) {}

  listaTransacoes: Transacoes = {
    receitas: [], despesas: [],
    total: 0
  };

  idTransacaoToDelete: number = 0;
  tipoTransacao: string = '';
  categoria: string = '';
  valor: number = 0;

  mostrarExclusao: boolean = false;

  ngOnInit() {
    this.carregarTransacoes();
  }

  carregarTransacoes(){
    this.transacaoService.getTransacoes().subscribe((transacoesRecebidas: Transacoes) => {
      this.listaTransacoes = transacoesRecebidas;
    })
  }

  enviarTransacao(categoria: string, valor: number){
    const transacao = {
      id: 0,
      tipo: this.tipoTransacao,
      categoria: categoria,
      valor: valor
    };

    if(transacao.tipo === 'Despesa' && valor < 0){
      this.transacaoService.postTransacao(transacao).subscribe(response => {
        this.listaTransacoes.despesas.push(response);
        this.listaTransacoes.total += response.valor;
      })
      this.limparCampos();
    } else if (transacao.tipo === 'Receita' && valor > 0) {
      this.transacaoService.postTransacao(transacao).subscribe(response => {
        this.listaTransacoes.receitas.push(response);
        this.listaTransacoes.total += response.valor;
      })
      this.limparCampos();
    } else {
      alert("Preencha os dados corretamente")
    }
  }

  limparCampos(){
    this.tipoTransacao = '';
    this.categoria = '';
    this.valor = 0;
  }

  pegarIdTransacaoEMostrarExclusao(id: number){
    this.mostrarExclusao = true;
    this.idTransacaoToDelete = id;
  }

  excluirTransacao(id: number){
    this.transacaoService.deleteTransacao(id).subscribe(
      () =>{
      if(this.listaTransacoes){
        this.listaTransacoes.receitas = this.listaTransacoes.receitas.filter(transacao => transacao.id !== id);
        this.listaTransacoes.despesas = this.listaTransacoes.despesas.filter(transacao => transacao.id !== id);
      }
    })
    this.mostrarExclusao = false;
  }

}

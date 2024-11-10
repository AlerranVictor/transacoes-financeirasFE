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

  transacaoToDelete: Transacao = {
    id: 0,
    tipo: '',
    categoria: '',
    valor: 0
  }

  tipoTransacao: string = '';
  categoria: string = '';
  valor: number | null = null;

  mostrarExclusao: boolean = false;

  ngOnInit() {
    this.carregarTransacoes();
  }

  carregarTransacoes(){
    this.transacaoService.getTransacoes().subscribe((transacoesRecebidas: Transacoes) => {
      this.listaTransacoes = transacoesRecebidas;
    })
  }

  enviarTransacao(categoria: string, valor: number | null){
    if(valor === null){
      console.error("O valor não pode ser nulo");
      return;
    }

    const transacao = {
      id: 0,
      tipo: this.tipoTransacao,
      categoria: categoria,
      valor: valor
    };

    if(transacao.tipo === 'Despesa'){
      transacao.valor = -Math.abs(valor);
      this.transacaoService.postTransacao(transacao).subscribe(response => {
        this.listaTransacoes.despesas.push(response);
        this.listaTransacoes.total += response.valor;
      })
      this.limparCampos();
    } else if (transacao.tipo === 'Receita') {
      transacao.valor = Math.abs(valor);
      this.transacaoService.postTransacao(transacao).subscribe(response => {
        this.listaTransacoes.receitas.push(response);
        this.listaTransacoes.total += response.valor;
      })
      this.limparCampos();
    }
  }

  limparCampos(){
    this.tipoTransacao = '';
    this.categoria = '';
    this.valor = null;
  }

  pegarTransacaoEMostrarExclusao(transacao: Transacao){
    this.mostrarExclusao = true;
    this.transacaoToDelete = transacao;
  }

  excluirTransacao(){
    this.transacaoService.deleteTransacao(this.transacaoToDelete.id).subscribe(
      () =>{
        this.listaTransacoes.receitas = this.listaTransacoes.receitas.filter(transacao => transacao.id !== this.transacaoToDelete.id);
        this.listaTransacoes.despesas = this.listaTransacoes.despesas.filter(transacao => transacao.id !== this.transacaoToDelete.id);
        this.listaTransacoes.total -= this.transacaoToDelete.valor;
        this.mostrarExclusao = false;
      }
    );
  }

}

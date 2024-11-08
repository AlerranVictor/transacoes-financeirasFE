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

  constructor(private transacao: TransacoesService) {}

  listaTransacoes: Transacoes = { receitas: [], despesas: [] };

  transacaoToDelete: Transacao | null = null;

  idTransacao: number | null = null; 
  tipoTransacao: string = '';
  categoria: string = '';
  valor: number = 0;

  mostrarExclusao: boolean = false;

  ngOnInit() {
    this.carregarTransacoes();
  }

  carregarTransacoes(){
    this.transacao.getTransacoes().subscribe((transacoesRecebidas: Transacoes) => {
      this.listaTransacoes = transacoesRecebidas;
      console.log(transacoesRecebidas);
    })
  }

  enviarTransacao(categoria: string, valor: number){
    const transacao = {
      tipo: this.tipoTransacao,
      categoria: categoria,
      valor: valor
    };

    if(transacao.tipo === 'Despesa' && valor < 0){
      this.transacao.postTransacao(transacao).subscribe(response => {
        console.log("Transação enviada: ", response);
        this.carregarTransacoes();
        this.limparCampos();
      })
    } else if (transacao.tipo === 'Receita' && valor > 0) {
      this.transacao.postTransacao(transacao).subscribe(response => {
        console.log("Transação enviada: ", response);
        this.carregarTransacoes();
        this.limparCampos();
      })
    } else {
      alert("Preencha os dados corretamente")
    }
  }

  limparCampos(){
    this.tipoTransacao = '';
    this.categoria = '';
    this.valor = 0;
  }

  pegarTransacaoEMostrarExclusao(transacao: Transacao){
    this.transacaoToDelete = transacao;
    this.mostrarExclusao = true;
  }

  excluirTransacao(){
    this.transacao.deleteTransacao(this.transacaoToDelete?.id).subscribe(() => {
      this.carregarTransacoes();
    },
    error => {
      console.error("Erro ao deletar transação: ", error);
    }
  );
  this.mostrarExclusao = false;
  }

}

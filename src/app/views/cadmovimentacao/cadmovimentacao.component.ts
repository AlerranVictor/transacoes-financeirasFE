import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransacoesService } from 'src/app/services/transacoes.service';
import { TransacaoRequest } from 'src/app/types/transacao/transacaoRequest';

@Component({
  selector: 'app-cadmovimentacao',
  templateUrl: './cadmovimentacao.component.html',
  styleUrls: ['./cadmovimentacao.component.sass']
})
export class CadmovimentacaoComponent {

  constructor(private transacoes: TransacoesService){}

  btnCadastrar: 'receita' | 'despesa' | null = null;

  onSubmit(form: NgForm){
    if(form.valid && this.btnCadastrar != null){
      this.transacoes.postTransacao(new TransacaoRequest(this.btnCadastrar, form.value.descricao, form.value.data, form.value.valor)).subscribe({
        next: (response) => {
          console.log("Transação cadastrada com sucesso!");
        },
        error: (error) => {
          console.log("Erro : ", error);
        }
      })
      this.btnCadastrar = null;
      form.resetForm();
    }
  }
}

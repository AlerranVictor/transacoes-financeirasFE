import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransacoesService } from 'src/app/services/transacoes.service';
import { TransacaoRequest } from 'src/app/types/transacao/transacaoRequest';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-cadmovimentacao',
  templateUrl: './cadmovimentacao.component.html',
  styleUrls: ['./cadmovimentacao.component.sass']
})
export class CadmovimentacaoComponent {

  constructor(private transacoes: TransacoesService, private home: HomeComponent){}

  btnCadastrar: 'receita' | 'despesa' | null = null;

  onSubmit(form: NgForm){
    if(form.valid && this.btnCadastrar != null){
      this.transacoes.postTransacao(new TransacaoRequest(this.btnCadastrar, form.value.descricao, form.value.data, form.value.valor)).subscribe({
        next: (response) => {
          console.log("Response: ", response);
        },
        error: (error) => {
          console.log("Erro : ", error);
        }
      })
      this.home.attReceitaDespesa(this.btnCadastrar, form.value.valor, new Date(form.value.data + 'T00:00:00'));
      this.btnCadastrar = null;
      form.resetForm();
    }
  }
}

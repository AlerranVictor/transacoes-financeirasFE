import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransacoesService } from 'src/app/services/transacoes.service';

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
      //chamar cadastro da transação

      //limpar formulário
      form.resetForm();
    }
  }
}

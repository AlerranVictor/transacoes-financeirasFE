import { Component } from '@angular/core';
import { TransacoesService } from 'src/app/services/transacoes.service';
import { DateRequest } from 'src/app/types/transacao/date';
import { TransacaoResponse } from 'src/app/types/transacao/transacaoResponse';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.sass']
})
export class TransacoesComponent {

  datasUsadasList: any[] = [];
  transacoesList: TransacaoResponse[] = [];
  dataSelecionada: string = '';

  receitaMensal: number = Number(sessionStorage.getItem('receitaMensal')) || 0;
  despesaMensal: number = Number(sessionStorage.getItem('despesaMensal')) || 0;
  lucroMensal: number = Number(sessionStorage.getItem('lucroMensal')) || 0;

  constructor(private transacoes: TransacoesService) {}

  ngOnInit(){
    this.transacoes.getDatasUsadas().subscribe((data: any[]) => {
      for(let i = 0; i<data.length; i++){
        this.datasUsadasList[i] = data[i][0] + '/' + data[i][1];
      }
    });
  }

  buscarTransacoesPorData(data: string){
    let dataParaBuscar = data.split('/').map(Number);
    this.transacoes.getTransacoesPorData(new DateRequest(dataParaBuscar[0], dataParaBuscar[1])).subscribe((transacoes: TransacaoResponse[]) => {
      this.transacoesList = transacoes;
    });
  }

}

import { Component } from '@angular/core';
import { TransacoesService } from 'src/app/services/transacoes.service';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.sass']
})
export class TransacoesComponent {

  anoAtual: number = new Date().getFullYear();
  mesAtual: string = new Date().toLocaleString('pt-br', { month: 'long'});

  listaAnos: number[] = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  listaMeses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private transacoes: TransacoesService) {}

}

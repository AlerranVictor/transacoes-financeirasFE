import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {

  tipoTransacao: string = '';
  mostrarSaldos: boolean = true;
  mostrarPainelCadastro: boolean = false;

  fecharPainelCadastro(){
    this.mostrarPainelCadastro = false;
  }

  onSubmit(form: NgForm){

  }
}

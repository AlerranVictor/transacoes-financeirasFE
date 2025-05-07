import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadmovimentacao',
  templateUrl: './cadmovimentacao.component.html',
  styleUrls: ['./cadmovimentacao.component.sass']
})
export class CadmovimentacaoComponent {

  onSubmit(form: NgForm){
    console.log("Brasil!!!")
  }
}

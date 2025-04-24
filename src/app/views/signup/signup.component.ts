import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  constructor(private loginService: LoginService, private router: Router){}

  onSubmit(form: NgForm){
    const senha = form.controls['senha']?.value;
    const repetirSenha = form.controls['repetirSenha']?.value;

    if(form.valid && this.conferirSenhas(senha, repetirSenha)){
      this.loginService.signup(form.value.nome, form.value.sobrenome, form.value.email, form.value.senha).subscribe({
        next: (response) => {
          console.log("Cadastro realizado com sucesso")
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log("Erro ao cadastrar: ", error)
        }
      })
    }
  }

  conferirSenhas(senha: string, repetirSenha: string): boolean{
    if(senha !== repetirSenha){
      return false;
    } else {
      return true;
    }
  }
}

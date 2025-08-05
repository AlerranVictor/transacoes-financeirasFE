import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginRequest } from 'src/app/types/login/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  loginRequest: LoginRequest = new LoginRequest();

  constructor(private loginService: LoginService, private router: Router){}

  onSubmit(form: NgForm){
    this.loginService.login(form.value.email, form.value.senha).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
    },
      error: (error) => {
        console.log("Erro ao realizar login: ", error);
        alert("Email ou senha inválidos");
      }
  });
}
}

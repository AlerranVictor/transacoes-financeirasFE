import { Component } from '@angular/core';
import { LoginRequest } from 'src/app/types/login/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  loginRequest: LoginRequest = new LoginRequest();

  constructor(){}

  onSubmit(){
    console.log("Dados de login: ", this.loginRequest)
  }
}

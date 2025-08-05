import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../types/login/login-response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  login(email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/login', {email, senha}).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('name', value.name);
      })
    )
  }

  signup(nome: string, sobrenome: string, email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/register', {nome, sobrenome, email, senha}).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('name', value.name);
      })
    )
  }
}

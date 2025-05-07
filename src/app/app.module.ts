import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './views/initial/initial.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { TransacoesComponent } from './views/transacoes/transacoes.component';
import { CadmovimentacaoComponent } from './views/cadmovimentacao/cadmovimentacao.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    TransacoesComponent,
    CadmovimentacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

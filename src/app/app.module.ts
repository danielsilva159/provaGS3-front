import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from'@angular/forms';
import { AppComponent } from './app.component';
import { ListarComponent } from './paginas/listar/listar.component';
import { CadastrarComponent } from './paginas/cadastrar/cadastrar.component';
import { LoginComponent } from './paginas/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthService } from './paginas/login/auth.service';
import { AuthGuardService } from './guards/auth-guard';

const appRoutes: Routes = [
  {path: 'listar', component: ListarComponent, canActivate:[AuthGuardService]},
  {path: '', component: LoginComponent},
  {path: 'cadastrar', component: CadastrarComponent, canActivate:[AuthGuardService]},
  {path: 'cadastrar/:id', component: CadastrarComponent, canActivate: [AuthGuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    CadastrarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

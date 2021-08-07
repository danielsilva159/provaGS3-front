import { AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logar = new FormGroup({
    login: new FormControl('', Validators.required),
    senha: new FormControl('',Validators.required)
  })
  mensagem = {tipo: null, msg: null};
  usuario: Usuario = {
    login: null,
    senha: null
  }
  constructor(
    private router: Router, private auth: AuthService
  ) { }

  ngOnInit() {
  }

  redireciona(){
  this.usuario.login = this.logar.value.login;
  this.usuario.senha = this.logar.value.senha;
this.mensagem = this.auth.fazerLogin(this.usuario)

setTimeout(data=>{
  this.mensagem = {tipo: null, msg: null};
}, 3000)
}

}

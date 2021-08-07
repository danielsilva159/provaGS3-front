import { Usuario } from './../../interfaces/usuario.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router) { }
private autenticacao:boolean = false
mensagem = {tipo: null, msg: null}

fazerLogin(usuario: Usuario){
  if((usuario.login === 'admin' && usuario.senha === '123456') || (usuario.login === 'comum' && usuario.senha === '123456')){
    this.router.navigate(['/listar'], {queryParams: usuario})
    this.autenticacao = true;
    this.mensagem.tipo = 1
    this.mensagem.msg = "Login Realizado com sucesso"
    return this.mensagem
  }
  else{
    this.autenticacao = false
    this.mensagem.tipo = 2
    this.mensagem.msg = "Usuario ou senha invalido"
    return this.mensagem;
}
}
usuarioEstaAutenticado(){
  return this.autenticacao;
}
}

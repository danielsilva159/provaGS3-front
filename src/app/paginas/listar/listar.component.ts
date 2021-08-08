import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  clientes: Cliente[]
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private routes: ActivatedRoute,
    private auth: AuthService
  ) { }
    usuario = {login: null, senha: null};
  ngOnInit() {
    this.clienteService.listar().subscribe(dados =>{
        this.usuario = this.auth.usuarioLogado();
        this.clientes = dados;
    }, erro =>{console.log(erro);
    })

  }

  editar(id){
    this.router.navigate([`/cadastrar/${id}`]);
  }
  excluir(id){
    this.clienteService.excluir(id).subscribe(data =>{
      console.log(data);

    })
  }

}

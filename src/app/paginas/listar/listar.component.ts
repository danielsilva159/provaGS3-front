import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ActivatedRoute, Router } from '@angular/router';

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
    private routes: ActivatedRoute
  ) { }
    usuario = {login: null, senha: null};
  ngOnInit() {

    this.clienteService.listar().subscribe(dados =>{
      this.routes.queryParams.subscribe(data =>{
        this.usuario = {login: data.login, senha: data.senha}
        this.clientes = dados;
      });

    }, erro =>{console.log(erro);
    })

  }

  editar(id){
    console.log(id)
    this.router.navigate([`/cadastrar/${id}`]);
  }
  excluir(){

  }
  adicionar(){
    this.router.navigate(['/cadastrar'])
  }

}

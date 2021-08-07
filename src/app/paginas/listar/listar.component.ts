import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  clientes: Cliente[]
  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.clienteService.listar().subscribe(dados =>{
       this.clientes = dados;

    }, erro =>{console.log(erro);
    })

  }

  editar(id){
    console.log(id)
    this.router.navigate([`/cadastrar/${id}`]);
  }
  excluir(){

  }

}

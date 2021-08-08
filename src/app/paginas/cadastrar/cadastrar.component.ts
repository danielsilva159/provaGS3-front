import { Telefone } from './../../interfaces/telefone.interface';
import { Cliente } from './../../interfaces/cliente.interface';
import { ClienteService } from './../cliente.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  cliente:Cliente = {
    id: null,
    nome: null,
    cpf: null,
    telefone: [],
    endereco: [],
    email:[]
  };

  cadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('')
  });
  telefone = new FormGroup({
    numero: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
  })
  endereco = new FormGroup({
    cep: new FormControl('', Validators.required),
    logradouro: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    uf: new FormControl('', Validators.required),
    complemento: new FormControl(''),
  })
  enderecos  = [];
  telefones = [];
  mascaraNome=[/^[a-zA-Z0-9]*$/]
  mascaraTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  mascaraCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/];
  mascaraCpf = [/\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ];
  regex = /[.,\/#!$%\^\ \&\*;:{}=\-_`~()]/g;
  modal = 'modal';
  constructor(private router: Router, private clienteService: ClienteService, private routes: ActivatedRoute) {

   }

  ngOnInit() {
    this.routes.params.subscribe(dados =>{
      if(dados.id){
       this.editarCliente(dados);
      }
    })
  }

  salvarTelefone(){
    this.telefones.push(this.telefone.value)
    this.telefone.reset();
    this.mascaraTelefone =  ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  }

tipoTelefone(){
   if(this.telefone.value.tipo === 'celular'){
     this.mascaraTelefone = ['(', /[1-9]/, /\d/, ')', ' ',/\9/,' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  }else{
    this.mascaraTelefone =  ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  }
}
buscarCep(){
  let cep = this.endereco.value.cep.replace(this.regex,'')
this.clienteService.buscarCep(cep).subscribe(dados =>{
  if(dados){
    this.endereco.controls.logradouro.setValue( dados['logradouro']);
    this.endereco.controls.bairro.setValue( dados['bairro']);
    this.endereco.controls.cidade.setValue( dados['localidade']);
    this.endereco.controls.uf.setValue( dados['uf']);
    this.endereco.controls.logradouro.setValue( dados['logradouro']);
    this.endereco.controls.complemento.setValue( dados['complemento']);
  }

})
}
salvarEndereco(){
  this.enderecos.push(this.endereco.value);
  this.endereco.reset();
}



salvarCliente(){
  this.cliente = this.verificarDados(this.cliente)

  console.log(this.cliente);

this.clienteService.salvar(this.cliente).subscribe(dados =>{
  this.router.navigate(['/listar']);

})

this.limparCliente();
}
botaoCancelar(){
  this.router.navigate(['/listar']);
}
verificarDados(cliente:Cliente){
  this.cliente.nome = this.cadastro.value.nome;
  this.cliente.cpf = this.cadastro.value.cpf.replace(this.regex, '');
  this.enderecos.forEach(dados =>{
    this.cliente.endereco.push({
          id: dados.id,
          bairro: dados.bairro,
          cep: dados.cep.replace(this.regex, ''),
          cidade: dados.cidade,
          complemento: dados.complemento,
          uf: dados.uf,
          logradouro: dados.logradouro
    })
  })
  this.telefones.forEach(tel =>{
    let tipoTelefone
    switch(tel.tipo){
      case 'residencial':
        tipoTelefone = 1;
        break;
        case 'comercial':
          tipoTelefone = 2;
          break;
          case 'celular':
            tipoTelefone = 3
            break;
    }
    this.cliente.telefone.push({
      id: tel.id,
      numero: tel.numero.replace(this.regex, ''),
      tipo: tipoTelefone
    });
  })
  return cliente;
}

limparCliente(){
  this.cliente = {
    nome: null,
    cpf: null,
    telefone: [],
    endereco: [],
    email:[]
  };
}
salvarEmail(){
  this.cliente.email.push({
    email: this.cadastro.value.email
  })

  this.cadastro.controls.email.setValue('');
}
habilitarSalvarCliente(){
  return !!this.telefones.length && !!this.enderecos.length && this.cadastro.valid && !!this.cliente.email.length
}
editarCliente(dados){
  this.clienteService.editar(dados.id).subscribe(c =>{
    console.log(c);

    this.cliente.id  = dados.id;
    this.cadastro.controls.nome.setValue(c.nome);
    this.cadastro.controls.cpf.setValue(c.cpf);
    c.endereco.forEach(end =>{
      end.cep = this.colocandoMascaraCep(end.cep);
      this.enderecos.push(end)
    })
    c.telefone.forEach(tel =>{
      tel = this.colocandoMascaraTelefone(tel);
      this.telefones.push(tel);
    })
    this.cliente.email = c.email;

  })
}
colocandoMascaraTelefone(telefone){
  let telefoneAjustado;
  if(telefone.tipo === 3){
        const parte1 = telefone.numero.slice(0,2);
        const parte2 = telefone.numero.slice(2, 3);
        const parte3 = telefone.numero.slice(3, 7);
        const parte4 = telefone.numero.slice(7, 11);

        telefoneAjustado = `(${parte1})${parte2}${parte3}-${parte4}`;
        telefone.tipo = 'celular';
    } else {
        const parte1 = telefone.numero.slice(0,2);
        const parte2 = telefone.numero.slice(2,6);
        const parte3 = telefone.numero.slice(6,11);
        telefoneAjustado = `(${parte1})${parte2}-${parte3}`;
        telefone.tipo = telefone.tipo === 1 ? 'residencial' : 'comercial';
    }
   telefone.numero = telefoneAjustado;

    return telefone;
}

colocandoMascaraCep(cep){
  let cepAjustado
  const parte1 = cep.slice(0,2);
  const parte2 = cep.slice(2, 5);
  const parte3 = cep.slice(5, 8);
  cepAjustado = `${parte1}.${parte2}-${parte3}`
  return cepAjustado;
}

deletarTelefone(index){
  this.telefones.splice(index,1);
}
deletarEndereco(index){
  this.enderecos.splice(index,1);
  console.log(this.enderecos);

}
deletarEmail(index){
  this.cliente.email.splice(index,1);
}
}

import { Cliente} from 'src/app/interfaces/cliente.interface';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }


  // Obtem todos os carros
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('/api/cliente')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  salvar(cliente: Cliente):Observable<Cliente>{
    return this.http.post('/api/cliente', cliente)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  editar(id_cliente: number):Observable<Cliente>{
    return this.http.get(`/api/cliente/buscarid/${id_cliente}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  buscarCep(cep){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  excluir(id_cliente: number):Observable<Cliente>{
    return this.http.delete(`/api/cliente/${id_cliente}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}

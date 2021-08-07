import { Email } from './email.interface';
import { Endereco } from './endereco.interface';
import { Telefone } from './telefone.interface';

export interface Cliente{
  id?: number,
  nome?: string,
  cpf?: string,
  email?: Email[]
  telefone?: Telefone[]
  endereco?: Endereco[]
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { filter, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuarioLogado : Usuario;  
  usuarios : Usuario;
  id :number;
  
  constructor( private httpClient : HttpClient,
               private loadingController : LoadingController,
               private navController : NavController) { }

  getUsuario() {
    return this.httpClient.get<Usuario[]>('http://localhost:8080/meuComid/resources/usuario/');
  }

  adicionar(usuario: Usuario) {
    return this.httpClient.post<Usuario>('http://localhost:8080/meuComid/resources/usuario/',usuario);
  }

  atualizar(usuario: Usuario) {
    return this.httpClient.put<Usuario>(`http://localhost:8080/meuComid/resources/usuario/${usuario.id}`, usuario);
  }

  salvar(usuario: Usuario) {
    if (usuario && usuario.id) {
      return this.atualizar(usuario);
    } else {
      return this.adicionar(usuario);
    } 
  }
  
  getUser(id: number) {
    return this.httpClient.get<Usuario>(`http://localhost:8080/meuComid/resources/usuario/${id}`);
  }
  
  efetuaLogin(user :String,password : String){ 
    return this.httpClient.get<Usuario>(`http://localhost:8080/meuComid/resources/usuario?usuario=${user}&senha=${password}`).pipe(tap(
      (usuario: Usuario) => this._usuarioLogado = usuario)
    )
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }


  excluir(usuario: Usuario) {
    return this.httpClient.delete(`http://localhost:8080/meuComid/resources/usuario/${usuario.id}`);
  }
}

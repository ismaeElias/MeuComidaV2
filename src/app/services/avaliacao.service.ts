import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { filter, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  avaliacao : Avaliacao;
  id :number;

  constructor(private httpClient : HttpClient,
              private loadingController : LoadingController,
              private navController : NavController) { }

  getAvaliacao() {
    return this.httpClient.get<Avaliacao[]>('http://localhost:8080/meuComid/resources/avaliacao/');
  }

  getAval(id:number){
    return this.httpClient.get<Avaliacao>(`http://localhost:8080/meuComid/resources/avaliacao/${id}`);
  }

  getAvaliacaoRestaurante(res: String){
    return this.httpClient.get<Avaliacao[]>(`http://localhost:8080/meuComid/resources/avaliacao?restaurante=${res}`);

    
  }

  adicionar(avaliacao : Avaliacao){
    return this.httpClient.post<Avaliacao>('http://localhost:8080/meuComid/resources/avaliacao/', avaliacao);
  }

  atualizar(avaliacao: Avaliacao) {
    return this.httpClient.put<Avaliacao>(`http://localhost:8080/meuComid/resources/avaliacao/${avaliacao.id}`, avaliacao);
  }

  salvar(avaliacao : Avaliacao){
    if (avaliacao && avaliacao.id) {
      return this.atualizar(avaliacao);
    } else {
      return this.adicionar(avaliacao);
    } 
  }

  excluir(avaliacao: Avaliacao) {
    return this.httpClient.delete(`http://localhost:8080/meuComid/resources/avaliacao/${avaliacao.id}`);
  }

}

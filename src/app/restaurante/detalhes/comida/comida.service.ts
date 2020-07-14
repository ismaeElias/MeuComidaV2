import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { filter, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  private _comidaLogado: Comida;
  comidas: Comida;
  id: number;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
    private navController: NavController) {
  }

  getComidas() {
    return new Promise(resolve => {
      this.httpClient.get("http://localhost:8080/meuComid/resources/comida/").subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  adicionar(comida: Comida) {
    return this.httpClient.post<Comida>('http://localhost:8080/meuComid/resources/comida/', comida);
  }

  salvar(comida: Comida) {
    if (comida && comida.id) {
      return this.atualizar(comida);
    } else {
      return this.adicionar(comida);
    } 
  }

  atualizar(comida: Comida) {
    return this.httpClient.put<Comida>(`http://localhost:8080/meuComid/resources/comida/${comida.id}`, comida);
  }

  
  getComidaRestaurante(id: number){
    return this.httpClient.get<Comida[]>(`http://localhost:8080/meuComid/resources/comida?restauranteId=${id}`);
    
  }

  buscaComida(id : number){
    return this.httpClient.get<Comida>(`http://localhost:8080/meuComid/resources/comida/${id}`).pipe(tap(
      (comida: Comida) => this._comidaLogado = comida)
    )
  }

  excluir(comida: Comida) {
    return this.httpClient.delete(`http://localhost:8080/meuComid/resources/comida/${comida.id}`);
  }

  validaComida(nome : String, id :number){
    return this.httpClient.get<Comida[]>(`http://localhost:8080/meuComid/resources/comida?nome=${nome}&restauranteId=${id}`)
  }
}

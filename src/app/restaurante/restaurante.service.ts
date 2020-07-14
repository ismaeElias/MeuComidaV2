import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { filter, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private _restauranteLogado: Restaurante;
  restaurantes: Restaurante;
  id: number;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
    private navController: NavController) {
  }

  getRestaurantes() {
    return new Promise(resolve => {
      this.httpClient.get("http://localhost:8080/meuComid/resources/restaurante/").subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  adicionar(restaurante: Restaurante) {
    return this.httpClient.post<Restaurante>('http://localhost:8080/meuComid/resources/restaurante/', restaurante);
  }

  salvar(restaurante: Restaurante) {
    if (restaurante && restaurante.id) {
      return this.atualizar(restaurante);
    } else {
      return this.adicionar(restaurante);
    } 
  }

  atualizar(restaurante: Restaurante) {
    return this.httpClient.put<Restaurante>(`http://localhost:8080/meuComid/resources/restaurante/${restaurante.id}`, restaurante);
  }

  buscaRes(id : number){
    return this.httpClient.get<Restaurante>(`http://localhost:8080/meuComid/resources/restaurante/${id}`).pipe(tap(
      (restaurante: Restaurante) => this._restauranteLogado = restaurante)
    )
  }

  excluir(restaurante: Restaurante) {
    return this.httpClient.delete(`http://localhost:8080/meuComid/resources/restaurante/${restaurante.id}`);
  }
  obtemRestauranteLogado() {
    return this._restauranteLogado;
  }

}

import { Injectable } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  
  pedido : Pedidos;

  constructor(  private httpClient : HttpClient,
                private loadingController : LoadingController,
                private navController : NavController) { }


  getPedidos(user) {
    return this.httpClient.get<Pedidos[]>(`http://localhost:8080/meuComid/resources/pedidos?usuario=${user}`);
  }

  atualizaQtd(pedido : Pedidos){
    return this.httpClient.put<Pedidos>(`http://localhost:8080/meuComid/resources/pedidos/${pedido.id}`, pedido);
  }

  adicionar(pedido : Pedidos){
    return this.httpClient.post<Pedidos>('http://localhost:8080/meuComid/resources/pedidos/', pedido);
  }

  getPed(id : number){
    return this.httpClient.get<Pedidos>(`http://localhost:8080/meuComid/resources/pedidos/${id}`);
  }

  salvar(pedido : Pedidos){
    if (pedido && pedido.id) {
      return this.atualizaQtd(pedido);
    } else {
      return this.adicionar(pedido);
    } 
  }

  excluir(pedido: Pedidos) {
    return this.httpClient.delete(`http://localhost:8080/meuComid/resources/pedidos/${pedido.id}`);
  }

  excluirTodos(id: number) {
    return this.httpClient.delete(`http://localhost:8080/meuComid/resources/pedidos/${id}`);
  }
}

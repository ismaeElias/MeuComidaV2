
import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../restaurante.service';


@Component({
  selector: 'app-cadastro-restaurante',
  templateUrl: './cadastro-restaurante.page.html',
  styleUrls: ['./cadastro-restaurante.page.scss'],
})
export class CadastroRestaurantePage implements OnInit {

  private restaurante: Restaurante;


  constructor(
    private restauranteService: RestauranteService,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.restaurante = {
      razaoSocial: '',
      telefoneContato: '', 
      detalhes: '', 
      segmento: "Pizzaria", 
      nivelValor: "medio",
      classificacao: 0, urlImagem: ''
    }
  }

  ngOnInit() {
  }

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.restauranteService.salvar(this.restaurante).subscribe(() => {
      loading.dismiss()
      this.navController.navigateForward(['/restaurante'])
    });
  }
}

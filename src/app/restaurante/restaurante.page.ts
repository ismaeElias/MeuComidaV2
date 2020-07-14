import { Component, OnInit } from '@angular/core';
import { RestauranteService } from './restaurante.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {

  private restaurantes: any;
  public loader;

  addButton :boolean;

  constructor(
    private restauranteService: RestauranteService,
    public loadingController: LoadingController,
    private activatedRoute : ActivatedRoute,
    private navController: NavController,
    private router: Router,
    private _alertCtrl: AlertController,
    private usuarioService : UsuarioService) {
    this.getRestaurantes();
  }

  ionViewWillEnter() {
    this.getRestaurantes();
  }

  getRestaurantes() {
    this.restauranteService.getRestaurantes()
      .then(data => {
        this.restaurantes = data;
      });
  }

  showLoading() {
    this.loadingController
      .create({
        message: 'Aguarde...',
        spinner: "crescent"
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => loading.dismiss(), 1000);
      });
  }

  ngOnInit() {
    const usuario = this.usuarioService.obtemUsuarioLogado();
    this.addButton = usuario[0].pessoaJuridica;
    
  }

  navDetalhes(){
    this.router.navigate(['restaurante/detalhes'])
  }

}


import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../comida.service';
import { RestauranteService } from 'src/app/restaurante/restaurante.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-comida',
  templateUrl: './cadastro-comida.page.html',
  styleUrls: ['./cadastro-comida.page.scss'],
})
export class CadastroComidaPage implements OnInit {

  private comida: Comida;
  private restaurante: Restaurante;
  valida : Comida[];

  constructor(
    private comidaService: ComidaService,
    private loadingController: LoadingController,
    private restauranteService: RestauranteService,
    private router : Router,
    private alertController : AlertController,
    private navController: NavController
  ) {
    this.restaurante= this.restauranteService.obtemRestauranteLogado();
    

    
    this.comida = {
      restauranteId :this.restaurante.id,
      itens_composicao: '',
      nome: '', 
      usuario: '',
      detalhes: '', 
      tipo: "Pizzaria",
      popularidade: 0, 
      valor: 0,
      urlImagem: ''
    }

    this.comida.restauranteId = this.restaurante.id; 
  }

  ngOnInit() {
  
  }

  async salvar(){
    //Busca o nome da comida no banco
    this.comidaService.validaComida(this.comida.nome,this.restaurante.id).subscribe(async (e) =>{
    this.valida = e
    //Se não tem, Cadastra
    if(this.valida.length <= 0 ){
      this.comidaService.salvar(this.comida).subscribe(async (e) => { 
        let loading = await this.loadingController.create({message:'Salvando'});
        loading.present();
        //redireciona  para a pagina do restaurante
        this.router.navigate(['restaurante/detalhes/comida/',this.restaurante.id]);
        loading.dismiss() 
      });
    }else{
      const alerta = await this.alertController.create({
        header: 'Erro!',
        message: 'Já existe uma comida cadastrada com este nome, verifique por favor :/',
        buttons: ['Confirmar']
      });
      alerta.present();
      this.ngOnInit();
    }
  })
  }
}

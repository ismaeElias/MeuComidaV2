import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular';
import { RestauranteService } from '../restaurante.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
 
  restaurante : Restaurante;

  
  edit : boolean;
  hideMe: boolean;
  infodet:boolean;
  infocad : boolean;
  editButton:boolean;
  
  constructor(  private restauranteService: RestauranteService,
                private activatedRoute : ActivatedRoute,
                private router: Router,
                private loadingController : LoadingController,
                private navController : NavController,
                private alertController: AlertController,
                private toastController : ToastController,
                private usuarioService : UsuarioService) {
    this.restaurante = {
      razaoSocial: '',
      telefoneContato: '', 
      detalhes: '', 
      segmento: "Pizzaria", 
      nivelValor: "medio",
      classificacao: 0, 
      urlImagem: ''
    }
   }


  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.restauranteService.buscaRes(id).subscribe((restaurante) => {
        this.restaurante = restaurante;
        this.infodet = true;
        this.infocad = false;
        loading.dismiss();
      });
    } 
    
    const usuario = this.usuarioService.obtemUsuarioLogado();
    this.editButton = usuario[0].pessoaJuridica;

    this.infodet = false;
    this.infocad = true;
  }
  navegarComida(){
    this.router.navigate(['restaurante/detalhes/comida'])
  }
  navegarAvalicao(){
    this.router.navigate(['restaurante/detalhes/avaliacao'])
  }



  editar(){
    this.edit = true;
    this.hideMe = true;
    this.editButton = false;
  }

  async salvarEdicao(){
    this.edit = false;
    this.hideMe = false;
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    this.restauranteService.salvar(this.restaurante).subscribe(() => { 
      loading.dismiss();
      this.ngOnInit();
    });
  }

  async confirmarExclusao(restaurante: Restaurante) {

    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o restaurante ${restaurante.razaoSocial}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(restaurante);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  excluir(restaurante: Restaurante) {
    this.restauranteService.excluir(restaurante).subscribe( async () => {
      this.navController.navigateForward(['/restaurante'])  
        const toast = await this.toastController.create({
          message: 'Restaurante excluído com sucesso!',
          duration: 2000
        });
        toast.present();
    });
  }

  sair(){
    this.navController.navigateForward(['/detalhes']);
  } 

}

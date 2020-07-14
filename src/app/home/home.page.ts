import { Component } from '@angular/core';
import { UsuarioService} from 'src/app/services/usuario.service';
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    
    usuario: Usuario;

  constructor(private usuarioService : UsuarioService,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private router: Router) {
      this.usuario = {pessoaJuridica: false, nome : '',telefone :'',CPF:'',email:'',endereco:'',numResidencia : 0,bairro:'',usuario:'',senha:''}
    }

  navegarRestaurante() {
    this.navController.navigateForward('restaurante');
  }
  
  navegarPedido() {
    this.router.navigate(['pedido'])
  } 

  navegarLogin() {
    this.router.navigate(['home/perfil'])
  } 
  
  ionViewWillEnter() {
    this.ngOnInit();
  }
  
  async ngOnInit(){
    
    const id_user = this.usuarioService.obtemUsuarioLogado();
    
    const id = id_user[0].id;  
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.usuarioService.getUser(id).subscribe((user) => {
        this.usuario = user;
        loading.dismiss();
      });
    } 
  }
  
  
}

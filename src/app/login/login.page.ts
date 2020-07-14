import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../app/services/usuario.service';
import { HttpClient } from '@angular/common/http';
import {LoadingController, AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public id : number;
 
  usuario : Usuario

  constructor( private usuarioService : UsuarioService,
               private loadingController : LoadingController,
               private navController : NavController,
               private router: Router,
               private _alertCtrl : AlertController) { 
                this.usuario = {pessoaJuridica: false, 
                                nome : '',
                                telefone :'',
                                CPF:'',
                                email:'',
                                endereco:'',
                                numResidencia : 0,
                                bairro:'',
                                usuario:'',
                                senha:''}
    }
  
    

  ngOnInit() {
  }
  
  async logar(){
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
      
    const user = this.usuario.nome;
    const password = this.usuario.senha
    

    this.usuarioService.efetuaLogin(user,password).subscribe(
      async (usuario : Usuario)=>{
        this.usuario = usuario
        
        loading.dismiss();
          if(this.usuario[0]){
              this.navController.navigateRoot(['/home']);
            }else{
              const alerta = await this._alertCtrl.create({
                header: 'Usuário não encontrado',
                message: 'Usuário ou senha inválido!',
                buttons: ['Confirmar']
              });
              alerta.present();
            }
          }
        ) 
    }
}

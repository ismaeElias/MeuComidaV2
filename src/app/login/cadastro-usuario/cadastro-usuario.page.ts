import { Component, OnInit } from '@angular/core';
import { UsuarioService} from 'src/app/services/usuario.service';
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  usuario: Usuario;
  
  constructor(private usuarioService : UsuarioService,
              private loadingController : LoadingController,
              private navController : NavController) {
    this.usuario = {pessoaJuridica: false, nome : '',telefone :'',CPF:'',email:'',endereco:'',numResidencia : 0,bairro:'',usuario:'',senha:''}  
  }

  ngOnInit() {
  }

  async salvar() {
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    
    this.usuarioService.salvar(this.usuario).subscribe(() =>  
    { loading.dismiss() 
      this.navController.navigateForward(['/login'])});
  }
}

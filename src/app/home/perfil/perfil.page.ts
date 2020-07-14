import { Component, OnInit ,HostBinding} from '@angular/core';
import { UsuarioService} from 'src/app/services/usuario.service';
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {

  usuario: Usuario;

  edit : boolean;
  hideMe: boolean;

  constructor(private usuarioService : UsuarioService,
              private loadingController : LoadingController,
              private activatedRoute : ActivatedRoute,
              private navController : NavController,
              private alertController: AlertController,
              private toastController: ToastController) { 
    this.usuario = {pessoaJuridica: false, nome : '',telefone :'',CPF:'',email:'',endereco:'',numResidencia : 0,bairro:'',usuario:'',senha:''},
    this.edit = false;
  }

async ngOnInit() {
    const a = this.usuarioService.obtemUsuarioLogado();
    const id = a[0].id;
    
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

  editar(){
    this.edit = true;
    this.hideMe = true;
  }

  async salvarEdicao(){
    this.edit = false;
    this.hideMe = false;
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    this.usuarioService.salvar(this.usuario).subscribe(() => { 
      loading.dismiss();
      this.ngOnInit();
    });
  }

  async confirmarExclusao(usuario: Usuario) {

    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o usuario ${usuario.usuario}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(usuario);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  excluir(usuario: Usuario) {
    this.usuarioService.excluir(usuario).subscribe( async () => {
      this.navController.navigateForward(['/login'])  
        const toast = await this.toastController.create({
          message: 'Usuário excluído com sucesso!',
          duration: 2000
        });
        toast.present();
    });
  }

  sair(){
    this.navController.navigateForward(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ToastController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.page.html',
  styleUrls: ['./detalhe-pedido.page.scss'],
})
export class DetalhePedidoPage implements OnInit {
  
  usuario : Usuario;
  ped : Pedidos;
  total : number;
  val : number;
  quant : number;
  
  constructor(private usuarioService : UsuarioService,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private pedidosService : PedidosService,
    private router: Router) { this.ped = {usuario :'',restaurante:'',comida:'',valor :0,qtd :0,total:0}; }

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.pedidosService.getPed(id).subscribe((ped)=>{
        this.ped = ped
        this.ped.total = this.ped.valor;
        loading.dismiss();
      })
    } 
  }


  calcTotal(){
    this.total = this.ped.qtd * this.ped.valor

    this.quant = this.ped.qtd;
    
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    try {
      this.ped.total = this.total
    } catch (error) {
      
    }
  }

  async salvarEdicao(){
    
    
    
    this.ped.qtd = this.quant;
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();
    this.pedidosService.atualizaQtd(this.ped).subscribe(() => {
      const id = this.usuarioService.obtemUsuarioLogado();
      this.navController.navigateForward(['home/pedido', id[0].id ]);
      loading.dismiss()
    });
  }
    
}

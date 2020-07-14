import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { log } from 'util';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  usuario : Usuario;
  pedido : Pedidos[];
  total : number;
  ped : Pedidos;
  qntPedido : number;
  botao : boolean;
  cupomDesconto : String;
  frete : number;
  cupomDesc : number;

  constructor(private usuarioService : UsuarioService,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private pedidosService : PedidosService,
    private router: Router) { 
      this.ped = {usuario :'',restaurante:'',comida:'',valor :0,qtd :0,total:0};
      this.qntPedido = 0;
      this.total = 0;
      this.botao = true;
      this.cupomDesc = 0;
    }

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.usuarioService.getUser(id).subscribe((user) => {
        this.usuario = user;
        
        
        
        this.pedidosService.getPedidos(this.usuario.usuario).subscribe((pedidos)=>{
          this.pedido = pedidos
          const valor = this.pedido.reduce((prev, elem)=> prev + elem.total,0);
          this.total = valor;
          this.qntPedido = this.pedido.length;

          if(this.pedido.length > 0){
            this.botao = false;
          }else{
            this.botao = true;
          }
          
          //Calculo frete
          if(this.usuario.bairro === 'Centro'){
            this.frete = 1.05
          }else if(this.usuario.bairro === 'Prospera'){
            this.frete = 1.10
          }else if(this.usuario.bairro === 'São luiz'){
            this.frete = 1.15
          }else{
            this.frete = 1.25
          }
          this.total = this.total * this.frete
          //
        })
        loading.dismiss();
      });
    }
  }

  ionViewWillEnter() {  
    this.ngOnInit()
  }

  async confirmarExclusao(ped: Pedidos) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o pedido do ${ped.comida}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(ped);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }


  private async excluir(ped: Pedidos) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.pedidosService.excluir(ped).subscribe(() => {
      this.ngOnInit();
      busyLoader.dismiss();
    });
  }

  async qntIem(){
    const toast = await this.toastController.create({
          message: `Você tem ${this.qntPedido} pedidos`,
          duration: 2000
        });
        toast.present();
  }

  async finalizar(){
    const max = this.pedido.length;
    this.pedido.forEach((elem)=>{
      this.pedidosService.excluirTodos(elem.id).subscribe(()=>{
        let counter = 0;
        let timer = setInterval(function() {
          if( counter >=  max) {
            clearInterval( timer );
          }
          counter++ 
        }, 1000);
        this.ngOnInit();
      })
      
    })
    const alerta = await this.alertController.create({
      header: 'Pedidos finalizados!',
      message: 'Seu pedido em breve chegará, navegue avalie os restaurante e veja as novidades!',
      buttons: ['Confirmar']
    });
    alerta.present();
  }

  async cupom(){
    
    if(this.cupomDesconto === 'Meu Comida' && this.cupomDesc === 0){
      let desconto = this.total * 0.2
      this.cupomDesc = this.cupomDesc + 1
      this.total = this.total - desconto
      const alerta = await this.alertController.create({
        header: 'Cupom',
        message: 'Obrigado por usar o Cupom de desconto do melhor App Delivery :D',
        buttons: ['Confirmar']
      });
      this.cupomDesconto = ''
      alerta.present();
    }else{
      const alerta = await this.alertController.create({
        header: 'Cupom Invalido!',
        message: 'Seu cupom é invalido ou já foi utilizado ;-; ',
        buttons: ['Confirmar']
      });
      this.cupomDesconto = ''
      alerta.present();
    }
  }
}

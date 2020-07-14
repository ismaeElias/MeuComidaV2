import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, NavController, ToastController, AlertController } from '@ionic/angular';
import { RestauranteService } from 'src/app/restaurante/restaurante.service';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';

@Component({
  selector: 'app-cadastro-avaliacao',
  templateUrl: './cadastro-avaliacao.page.html',
  styleUrls: ['./cadastro-avaliacao.page.scss'],
})
export class CadastroAvaliacaoPage implements OnInit {

  avaliacao : Avaliacao;
  usuario : Usuario
  restaurante : Restaurante;
  hideMe: boolean;
  hideEdit : boolean;
  hideEditIniciado : boolean;
  edit : boolean;
  hideDt : boolean;

  constructor(private activatedRoute : ActivatedRoute,
              private toastController: ToastController,
              private restauranteService: RestauranteService,
              private loadingController : LoadingController,
              private alertController: AlertController,
              private avalicaoService : AvaliacaoService,
              private router : Router,
              private usuarioService : UsuarioService,
              private navController : NavController) 
  { 
    
    this.avaliacao = {nome:'', usuario:'',restaurante: '', comentario:'', nota: 0 },
    this.usuario = {pessoaJuridica: false, nome : '',telefone :'',CPF:'',email:'',endereco:'',numResidencia : 0,bairro:'',usuario:'',senha:''}
    this.restaurante = {razaoSocial : '', telefoneContato: '',detalhes :'', segmento : '', nivelValor : '', classificacao : 0, urlImagem : ''}
  }


  

  async ngOnInit() {
    const usuLogado = this.usuarioService.obtemUsuarioLogado();
    const idusu = usuLogado[0].id;
    const id = parseInt(this.activatedRoute.snapshot.params['id']);  

    if(id){
       // Carregar as informações Avaliacao
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.avalicaoService.getAval(id).subscribe((aval) => {
        this.avaliacao = aval;
        if(usuLogado[0].usuario === this.avaliacao.usuario){
          this.hideEdit = true;
          this.hideMe = false;
          this.hideDt = true
          this.edit = false;
        }else{
          this.hideDt = true
          this.hideEdit = false;
          this.hideMe = false;
        }
        loading.dismiss();
      });

    }else{

    this.hideEdit = false;
    this.hideMe = true;
    this.edit = true;
    
    if(idusu) {
      // Carregar as informações Usuario
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.usuarioService.getUser(idusu).subscribe((user) => {
        this.usuario = user;
        this.avaliacao.nome = this.usuario.nome;
        this.avaliacao.usuario = this.usuario.usuario;
        loading.dismiss();
      });
    } 
    // Carregar as informações Restaurante
    const buscaRes = this.restauranteService.obtemRestauranteLogado();
    const idRes = buscaRes.id;
    if(idRes){
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.restauranteService.buscaRes(idRes).subscribe((dataRes) => {
        this.restaurante = dataRes;
        this.avaliacao.restaurante = this.restaurante.razaoSocial;
        loading.dismiss();
      });
    }
  }
}
   // Salva Avaliacao
  async salvar(){
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    this.avalicaoService.salvar(this.avaliacao).subscribe(() => { 
      const buscaRes = this.restauranteService.obtemRestauranteLogado();
      this.router.navigate(['restaurante/detalhes/avaliacao/',buscaRes.id]);
      this.avaliacao.comentario='';
      this.avaliacao.nota = 0;
      loading.dismiss() 
    });
   }
   
  
  //Habilita botões e campos para editar
  editar(){
    this.hideEditIniciado = true;
    this.hideEdit = false;
    this.edit = true;
  }

   // Salva edição
  async salvarEdit(){
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    this.avalicaoService.salvar(this.avaliacao).subscribe(() => { 
      const buscaRes = this.restauranteService.obtemRestauranteLogado();
      this.router.navigate(['restaurante/detalhes/avaliacao/',buscaRes.id]);
      this.hideEditIniciado = false;
      this.hideEdit = true;
      this.edit = false;
      loading.dismiss();
    });
  }


  //Excluir avaliacao

  excluir(avaliacao: Avaliacao) {
    
    this.avalicaoService.excluir(avaliacao).subscribe( async () => {
      const buscaRes = this.restauranteService.obtemRestauranteLogado();
      this.router.navigate(['restaurante/detalhes/avaliacao/',buscaRes.id])
        const toast = await this.toastController.create({
          message: 'Avaliação excluída com sucesso!',
          duration: 2000
        });
        toast.present();
    });
  }

  async confirmarExclusao(avaliacao: Avaliacao) {

    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir está avaliacão ${this.avaliacao.usuario}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(avaliacao);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }
  
}

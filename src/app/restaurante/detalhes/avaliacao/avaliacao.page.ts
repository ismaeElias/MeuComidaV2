import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController } from '@ionic/angular';
import { RestauranteService } from '../../restaurante.service';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';


@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {

  restaurante : Restaurante;
  
  avaliacao : Avaliacao[]
  
  constructor(private activatedRoute : ActivatedRoute,
              private usuarioService : UsuarioService,
              private restauranteService: RestauranteService,
              private loadingController : LoadingController,
              private avalicaoService : AvaliacaoService,
              private router: Router)
            { 
              this.restaurante = {
                razaoSocial: '',
                telefoneContato: '', 
                detalhes: '', 
                segmento: "Pizzaria", 
                nivelValor: "medio",
                classificacao: 0, urlImagem: ''
              }
}

  ionViewWillEnter() {
    this.ngOnInit()
  }

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.restauranteService.buscaRes(id).subscribe((data)=>{
      this.restaurante = data
      this.avalicaoService.getAvaliacaoRestaurante(this.restaurante.razaoSocial).subscribe((res)=>{
        this.avaliacao =  res
      })
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  ondeFica: any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }
  
  ngOnInit() {
    this.route.parent.params.subscribe((parametros: Params) => {
      const { id } = this.route.parent.snapshot.params;
      this.ofertasService.getOndeFicaOfertaPorId(id)
        .then((resposta: any) => {
          this.ondeFica = resposta;
        });
    });
  }

  

}

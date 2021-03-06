import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { OfertasService } from "../ofertas.service";
import { Oferta } from "../shared/oferta.model";
import { CarrinhoService } from "../carrinho.service";

@Component({
	selector: "app-oferta",
	templateUrl: "./oferta.component.html",
	styleUrls: ["./oferta.component.css"],
	providers: [OfertasService],
})
export class OfertaComponent implements OnInit {
	oferta: Oferta;

	constructor(
		private route: ActivatedRoute,
		private ofertasService: OfertasService,
		private carrinhoService: CarrinhoService
	) { }

	ngOnInit() {
		this.route.params.subscribe((parametros: Params) => {
			const { id } = parametros;
			this.ofertasService.getOfertasPorId(id)
				.then((oferta: Oferta) => {
					this.oferta = oferta;
				});
		});
	}

	adicionarItemCarrinho(oferta: Oferta): void { 
		this.carrinhoService.incluirItem(oferta);
	}
}

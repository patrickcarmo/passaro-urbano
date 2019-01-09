import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OrdemCompraService } from "../ordem-compra.service";
import { Pedido } from "../shared/pedido.model";
import { CarrinhoService } from "../carrinho.service";
import ItemCarrinho from "../shared/item-carrinho.model";

@Component({
	selector: "app-ordem-compra",
	templateUrl: "./ordem-compra.component.html",
	styleUrls: ["./ordem-compra.component.css"],
	providers: [OrdemCompraService],
})
export class OrdemCompraComponent implements OnInit {
	public idPedidoCompra: number;
	public itensCarrinho: ItemCarrinho[] = [];

	public formulario: FormGroup = new FormGroup({
		endereco: new FormControl(null, [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(120),
		]),
		numero: new FormControl(null, [
			Validators.required,
			Validators.minLength(1),
			Validators.maxLength(20),
		]),
		complemento: new FormControl(null),
		formaPagamento: new FormControl(null, [Validators.required]),
	});

	constructor(
		private ordemCompraService: OrdemCompraService,
		public carrinhoService: CarrinhoService	
	) { }

	ngOnInit() {
		this.itensCarrinho = this.carrinhoService.exibirItens();
	}

	public confirmarCompra(): void {
		const { status, controls, value } = this.formulario;
		if (status === "INVALID") {
			for (const input in controls) {
				if (controls[input].invalid) {
					controls[input].markAsTouched();
				}
			}
		} else {
			if (this.carrinhoService.exibirItens().length) {
				const pedido: Pedido = new Pedido(
					value.endereco,
					value.numero,
					value.complemento,
					value.formaPagamento,
					this.carrinhoService.exibirItens()
					
				);
				this.ordemCompraService
					.efetivarCompra(pedido)
					.subscribe((idPedido: number) => {
						this.idPedidoCompra = idPedido;
						this.carrinhoService.limparCarrinho();
					});
			} else {
				alert("Você não selecionou nenhum item!");
			}			
		}
	}

	adicionar(item: ItemCarrinho): void {
		this.carrinhoService.adicionarQuantidade(item);
	}

	diminuir(item: ItemCarrinho): void {
		this.carrinhoService.diminuirQuantidade(item);
	}

}

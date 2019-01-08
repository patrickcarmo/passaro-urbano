import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OrdemCompraService } from "../ordem-compra.service";
import { Pedido } from "../shared/pedido.model";

@Component({
	selector: "app-ordem-compra",
	templateUrl: "./ordem-compra.component.html",
	styleUrls: ["./ordem-compra.component.css"],
	providers: [OrdemCompraService],
})
export class OrdemCompraComponent implements OnInit {
	public idPedidoCompra: number;

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

	constructor(private ordemCompraService: OrdemCompraService) { }

	ngOnInit() { }

	public confirmarCompra(): void {
		const { status, controls, value } = this.formulario;
		if (status === "INVALID") {
			console.log("formulário está inválido");
			for (const input in controls) {
				if (controls[input].invalid) {
					controls[input].markAsTouched();
				}
			}
		} else {
			const pedido: Pedido = new Pedido(
				value.endereco,
				value.numero,
				value.complemento,
				value.formaPagamento
			);
			this.ordemCompraService
				.efetivarCompra(pedido)
				.subscribe((idPedido: number) => {
					this.idPedidoCompra = idPedido;
				});
		}
	}
}

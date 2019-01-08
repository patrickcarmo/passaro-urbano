import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";

import { Pedido } from "./shared/pedido.model";
import { URL_API } from "./app.api";
import { Observable } from "rxjs";
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {

	constructor(private http: Http) { }

	efetivarCompra(pedido: Pedido): Observable<number> {
		
		let headers: Headers = new Headers();
		headers.set('Content-type', 'application/json');

		return this.http.post(
			`${URL_API}/pedidos`,
			JSON.stringify(pedido),
			new RequestOptions({ headers })
		).pipe(
			map((resposta: Response) => 
				resposta.json().id
			)
		)
	}
}

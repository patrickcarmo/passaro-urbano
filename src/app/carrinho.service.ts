import ItemCarrinho from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

export class CarrinhoService {
	
    itens: ItemCarrinho[] = [];

    exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    getItemCarrinhoById(id: number): ItemCarrinho {
        return this.itens.find((item: ItemCarrinho) => item.id === item.id);
    }

    incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );
        let itemCarrinhoEncontrado = this.getItemCarrinhoById(itemCarrinho.id);
        itemCarrinhoEncontrado ? itemCarrinhoEncontrado.quantidade++ : this.itens.push(itemCarrinho);
    }

    totalCarrinhoCompras(): number {
        let total: number = 0;
        this.itens.map((item: ItemCarrinho) => total += (item.valor * item.quantidade));
        return total;
    }

    adicionarQuantidade(item: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.getItemCarrinhoById(item.id);
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade++;
        }
    }
    
    diminuirQuantidade(item: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.getItemCarrinhoById(item.id);
        if (itemCarrinhoEncontrado) { 
            itemCarrinhoEncontrado.quantidade--;
            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        }
	}

}

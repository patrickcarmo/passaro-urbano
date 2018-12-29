import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    
    transform(texto: string, tamanho: number): string {
        return texto.length > tamanho ? texto.substr(0, tamanho) + '...' : texto;
    }

}
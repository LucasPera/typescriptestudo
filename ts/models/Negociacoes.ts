import { Negociacao } from './Negociacao';
import { Imprimivel } from './Imprimivel';

export class Negociacoes implements Imprimivel {

    //cria um array de negociação
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);

    }

    paraTexto(): void {
        console.log("Impressão");
        console.log(JSON.stringify(this._negociacoes));
    }

}
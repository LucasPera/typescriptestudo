import { Negociacao } from './Negociacao';

export class Negociacoes {

    //cria um array de negociação
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);

    }

}
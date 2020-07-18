import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject } from '../helpers/decorators/index';


//export serve para poder ser importado por outras classes
export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    //cria e inicializa
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {

        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {

        //cancela comportamento default (recarregar a pagina)
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ',' ));

        if(!this.diaUtil(data)){
            this._mensagemView.update('Somente negociações em dias úteis, por favor');
            return
        }

        //cria uma negociacao com os valores do html
        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',' )),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociação adiciona com sucesso!');
        
    }

    private diaUtil(data: Date): Boolean {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;

    }
        
}

enum DiaDaSemana {
    
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado

}
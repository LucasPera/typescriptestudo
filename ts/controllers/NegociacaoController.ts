import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';


let timer = 0;

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

    private _service = new NegociacaoService();

    constructor() {

        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {

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

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociação adiciona com sucesso!');
        
    }

    private diaUtil(data: Date): Boolean {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;

    }

    @throttle()
    async importaDados() {

        try {
            
            //suspende a execução e quando terminar volta nesse trecho (assincrono)
            const negociacoesParaImportar = await this._service
                .obterNegociacoes(res => {
    
                    if(res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                });
                 
            const negociacoesJaImportadas = this._negociacoes.paraArray();
    
            //adiciona apenas negociacoes que não existem
            negociacoesParaImportar
                .filter(negociacao => 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
            .forEach(negociacao => 
                this._negociacoes.adiciona(negociacao))
            
            this._negociacoesView.update(this._negociacoes);         
            
        } catch (error) {
            this._mensagemView.update(error.message);
        }

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
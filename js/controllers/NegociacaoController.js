class NegociacaoController {
    constructor() {
        //pega os valores do html
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');
    }
    adiciona(event) {
        //cancela comportamento default (recarregar a pagina)
        event.preventDefault();
        //cria uma negociacao com os valores do html
        const negociacao = new Negociacao(new Date(this._inputData.value.replace(/-/g, ',')), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        console.log(negociacao);
    }
}

export class Negociacao{

    //cria variaves e atribui no construtor
    //readonly, apenas leitura. nessa caso não precisa dos gets
    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number){}

    
    get volume(){
        return this.quantidade * this.valor;
    }

}
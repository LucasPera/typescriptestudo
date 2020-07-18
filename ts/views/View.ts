import { logarTempoDeExecucao } from '../helpers/decorators/index';

//classe para usar construtor padrão nas outras views
export abstract class View<T> {
    
    private _elemento: JQuery;
    private _escapar:boolean;

    //é parametro opcional, se n for passado fica false
    constructor(seletor: string, escapar: boolean = false) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    update(model: T):void {

        let template = this.template(model);

        //impede que injete script se escapar = true
        if(this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');

        this._elemento.html(template);
    
    }

    abstract template(model: T): string
}
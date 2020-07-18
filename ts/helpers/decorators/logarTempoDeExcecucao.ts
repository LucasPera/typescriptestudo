export function logarTempoDeExecucao(emSegundos: boolean = false) {
    
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        //metodo original
        const metodoOriginal = descriptor.value;

        //sobrescrevi o mnetodo original, aceita varios parametros
        descriptor.value = function(...args: any[]) {

            let unidade: string = 'ms';
            let divisor: number = 1;
            if(emSegundos) {
                unidade = 's';
                divisor = 1000;
            }

            console.log('---------------------------------')
            console.log(`parametros passados para o meteodo ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            //chamando o metodo original no this
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O retorno do metodo ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O metodo ${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`)
            return retorno;

        }

        return descriptor;

    }
}
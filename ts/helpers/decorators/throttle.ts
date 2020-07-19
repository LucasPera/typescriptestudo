export function throttle(millisegundos = 500) {
    
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        //metodo original
        const metodoOriginal = descriptor.value;

        let timer = 0;

        //sobrescrevi o mnetodo original, aceita varios parametros
        descriptor.value = function(...args: any[]) {
            
            //cancela comportamento default (recarregar a pagina)
            if(event) event.preventDefault();

            clearInterval(timer);
            
            timer = setTimeout(() => metodoOriginal.apply(this, args), millisegundos);

        }

        return descriptor;

    }
}
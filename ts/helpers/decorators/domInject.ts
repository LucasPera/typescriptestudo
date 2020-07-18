export function domInject(seletor: string) {

    return function(target: any, key: string) {
        
        let elemento:JQuery;

        const getter = function() {
            //ja buscou o elemento no dom?
            if(!elemento) {
                //busca no dom
                console.log(`buscando ${seletor} para injetar em ${key}`);
                elemento = $(seletor);
            }

            return elemento;
        }


        //pra usar o getter
        Object.defineProperty(target, key, {
            get: getter
        });

    }

}
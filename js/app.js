const controller = new NegociacaoController();
document.querySelector('.form')
    .addEventListener('submit', controller.adiciona.bind(controller)); //chama o metodo adiciona ao clicar no botão

// Espera o HTML carregar completo antes de executar o código
document.addEventListener('DOMContentLoaded', function () {

//Cria as variáveis
    const prevbtn = document.getElementById('prev');
    const nextbtn = document.getElementById('next');
    const dogs = document.querySelectorAll('.dog');
    const dots = document.querySelectorAll('.dot');
    const numberindicator = document.querySelector('.numbers');
    const list = document.querySelector('.list');
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('nav ul li a');

    let active = 0;
    const total = dogs.length;

    //Configura para alterar o estilo  da pagina ativa no momento
    menuLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

    //Configura a função update
    function update(direction) {
    //Remove a classe active dos itens
        document.querySelector('.dog.active').classList.remove('active');
        document.querySelector('.dot.active').classList.remove('active');
    //Garante que se chegar no ultimo valor as setas voltam para o inicio/final
        if (direction > 0) {
            active = active + 1

            if (active === total) {
                active = 0
            }
        }
        else if (direction < 0) {
            active = active - 1

            if (active < 0) {
                active = total - 1
            }
        }
    //Adiciona a classe active nos itens
        dogs[active].classList.add('active')
        dots[active].classList.add('active')
    //Adiciona um 0 no inicio do contador
        numberindicator.textContent = String(active + 1).padStart(2, '0')

    }
    //Configura as setas para avançar/voltar
    prevbtn.addEventListener('click', function () {
        update(-1)
    })

    nextbtn.addEventListener('click', function () {
        update(1)

    })

});



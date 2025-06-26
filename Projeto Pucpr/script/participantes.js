// Espera o HTML carregar completo antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
//Definição das variaveis
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const lista = document.getElementById('listaParticipantes');
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    

//Coloca a msg se não houver participantes   
    if (participantes.length === 0) {
        lista.innerHTML = '<p class="sem-dados">Nenhum participante cadastrado ainda.</p>';
        return;
    }

//Cria os cards de participantes com os dados no localstorage   
    participantes.forEach((participante, index) => {
        const card = document.createElement('div');
        card.className = `participante-card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <h3>${participante.nome}</h3>
            <p><strong>Contato:</strong> ${participante.telefone} | ${participante.email}</p>
            <div class="historia-pet">
                <p>${participante.historia}</p>
            </div>
            <p class="data-cadastro">Cadastrado em: ${participante.data}</p>
        `;
        lista.appendChild(card);
    });
//Definição da variavel card
    const cards = document.querySelectorAll('.participante-card');
    let currentIndex = 0;

//Atualiza as informações do carrosel   
    function updateCarrossel() {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }

//Configura os botões de proximo e anterior   
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarrossel();
    });

    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarrossel();
    });

//Garantia que o carrossel vai sempre estar atualizado    
    updateCarrossel();
});
// Espera o HTML carregar completo antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
//Cria as constantes
    const params = new URLSearchParams(window.location.search);
    const dadosGet = document.getElementById('dados-get');
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const dadosLocal = document.getElementById('dados-localstorage');
//Exibe msg padrão caso não haja dados, se tiver ele coloca na lista para dados via GET  
    if(params.size === 0) {
        dadosGet.innerHTML = '<p class="sem-dados">Nenhum dado recebido via GET.</p>';
    } else {
        let html = '<ul class="dados-lista">';
        params.forEach((value, key) => {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        });
        html += '</ul>';
        dadosGet.innerHTML = html;
    }
//Exibe msg padrão caso não haja dados, se tiver ele coloca na lista para o carrosel de participantes   
    if(participantes.length === 0) {
        dadosLocal.innerHTML = '<p class="sem-dados">Nenhum participante no histórico.</p>';
    } else {
        let html = '<div class="lista-participantes">';
        participantes.slice(-3).forEach(participante => {
            html += `
                <div class="participante-card">
                    <h3>${participante.nome}</h3>
                    <p><strong>Contato:</strong> ${participante.telefone} | ${participante.email}</p>
                    <div class="historia-pet">
                        <p>${participante.historia}</p>
                    </div>
                    <p class="data-cadastro">Cadastrado em: ${participante.data}</p>
                </div>
            `;
        });
// Fecha o container de participantes e insere o conteúdo no elemento
        html += '</div>';
        dadosLocal.innerHTML = html;
    }
});
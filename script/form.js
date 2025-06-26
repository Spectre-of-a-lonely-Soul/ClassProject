// Aguarda o carregamento completo do HTML antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formPet');
    const nomeInput = document.getElementById('nomeTutor');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');
    const historiaInput = document.getElementById('historia');
    const contador = document.getElementById('contadorCaracteres');

//Faz a máscara de telefone após ser colocado e durante a digitação
    telefoneInput.addEventListener('input', mascaraTelefone);
    telefoneInput.addEventListener('keydown', function (e) {
//Permite movimentação com teclas de navegação
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
// Chama a função de máscara
        mascaraTelefone(e);
    });
//Cria a função de mascara de telefone
    function mascaraTelefone(event) {
//Bloqueia qualquer tecla não permitida
        const teclaPermitida = /^[0-9\b\t]$/i.test(event.key) ||
            ['Backspace', 'Delete', 'Tab'].includes(event.key);

        if (!teclaPermitida) {
            event.preventDefault();
            return;
        }
// Remove tudo que não for número
        let telefone = event.target.value.replace(/\D/g, "");
        let tamanho = telefone.length;
// Configura a mascara com os 11 digitos de telefones, () e hífen
        if (tamanho > 11) telefone = telefone.substring(0, 11);

        if (tamanho === 0) {
            event.target.value = "";
        } else if (tamanho <= 2) {
            event.target.value = "(" + telefone;
        } else if (tamanho <= 7) {
            event.target.value = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2);
        } else {
            event.target.value = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 7) + "-" + telefone.substring(7);
        }
    }

// Impede de digitar números no campo de nome
    nomeInput.addEventListener('keypress', function (e) {
        if (/\d/.test(e.key)) e.preventDefault();
    });
// Faz funcionar o contador de caracteres do campo história e muda sua cor para vermelho quando passar de 180 caracteres
    historiaInput.addEventListener('input', function () {
        const caracteres = this.value.length;
        contador.textContent = caracteres;
        contador.style.color = caracteres >= 180 ? '#e74c3c' : '#666';
    });

// Validação ao enviar o formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let formValido = true;

// Valida o nome
        if (!nomeInput.value.trim() || /\d/.test(nomeInput.value)) {
            mostrarErro('erroNome', 'Digite um nome válido (sem números)');
            nomeInput.classList.add('invalido');
            formValido = false;
        } else {
            ocultarErro('erroNome');
            nomeInput.classList.add('valido');
        }
//Valida o telefone 
        const telefoneNumeros = telefoneInput.value.replace(/\D/g, '');
        if (telefoneNumeros.length !== 11) {
            mostrarErro('erroTelefone', 'Digite um telefone válido (11 dígitos)');
            telefoneInput.classList.add('invalido');
            formValido = false;
        } else {
            ocultarErro('erroTelefone');
            telefoneInput.classList.add('valido');
        }
// Valida o e-mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            mostrarErro('erroEmail', 'Digite um e-mail válido');
            emailInput.classList.add('invalido');
            formValido = false;
        } else {
            ocultarErro('erroEmail');
            emailInput.classList.add('valido');
        }
// Valida a história com pelo menos 20 caracteres
        if (historiaInput.value.length < 20) {
            mostrarErro('erroHistoria', 'Mínimo 20 caracteres');
            historiaInput.classList.add('invalido');
            formValido = false;
        } else {
            ocultarErro('erroHistoria');
            historiaInput.classList.add('valido');
        }
// Salva os dados do formulário se valido
        if (formValido) {
            const dadosPet = {
                nome: nomeInput.value.trim(),
                telefone: telefoneInput.value.trim(),
                email: emailInput.value.trim(),
                historia: historiaInput.value.trim(),
                data: new Date().toLocaleDateString('pt-BR')
            };

// Salva os dados no localStorage
            salvarParticipante(dadosPet);

//Configura a formatação que será enviado os dados
            const params = new URLSearchParams();
            params.append('nome', dadosPet.nome);
            params.append('telefone', dadosPet.telefone);
            params.append('email', dadosPet.email);
            params.append('historia', dadosPet.historia);
            params.append('data', dadosPet.data);
//Redireciona para o html
            window.location.href = `formAction.html?${params.toString()}`;
        }
    });
//Exibe a msg de erro se invalido
    function mostrarErro(id, mensagem) {
        const elemento = document.getElementById(id);
        elemento.textContent = mensagem;
        elemento.style.display = 'block';
    }
//Apaga a msg de erro
    function ocultarErro(id) {
        document.getElementById(id).style.display = 'none';
    }
});
//Função para salvamento geral dos dados no localstorage
function salvarParticipante(dados) {
// Recupera os dados existentes
    let participantes = JSON.parse(localStorage.getItem('participantes')) || [];
// Adiciona o novo participante ao array
    participantes.push(dados);
// Salva de volta no localStorage
    localStorage.setItem('participantes', JSON.stringify(participantes));
}
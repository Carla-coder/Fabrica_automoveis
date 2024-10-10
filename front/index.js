const areas = {
    1: [], // Área 1 - vazia
    2: [
        { modelo: 'Fusca', preco: 15000 },
        { modelo: 'Civic', preco: 90000 }
    ],
    // Adicione mais áreas e carros conforme necessário
};

let automovelSelecionado = null; // Armazena o automóvel que será vendido

function visualizarArea(areaElement) {
    const areaId = areaElement.getAttribute('data-area-id');
    const carros = areas[areaId];

    const listaAutomoveisDiv = document.getElementById('lista-automoveis');
    listaAutomoveisDiv.innerHTML = ''; // Limpa o conteúdo anterior
    const detalhesAreaDiv = document.getElementById('detalhes-area');

    if (carros.length === 0) {
        detalhesAreaDiv.innerHTML = `<p>A área ${areaId} está vazia.</p>`;
    } else {
        detalhesAreaDiv.innerHTML = `<h2>Área ${areaId}</h2>`;
        carros.forEach((carro, index) => {
            const carroDiv = document.createElement('div');
            carroDiv.innerHTML = `
                <strong>Modelo:</strong> ${carro.modelo} <br>
                <strong>Preço:</strong> R$ ${carro.preco.toFixed(2)} 
                <button onclick="venderCarro(${index}, ${areaId})">Vender</button>
            `;
            listaAutomoveisDiv.appendChild(carroDiv);
        });
    }

    detalhesAreaDiv.classList.remove('hidden');
}

// Função para iniciar o processo de venda
function venderCarro(index, areaId) {
    const automovel = areas[areaId][index];
    automovelSelecionado = { ...automovel, areaId, index }; // Armazena o automóvel para venda

    // Exibe os detalhes no modal
    document.getElementById('modelo-carro').innerText = `Modelo: ${automovel.modelo}`;
    document.getElementById('vender-modal').classList.remove('hidden');
}

// Função para confirmar a venda
function confirmarVenda() {
    if (automovelSelecionado) {
        const { modelo, areaId, index } = automovelSelecionado;

        // Remove o automóvel da área
        areas[areaId].splice(index, 1);
        alert(`Automóvel ${modelo} vendido com sucesso!`);

        // Atualiza a interface
        fecharModal();
        const areaElement = document.querySelector(`.area[data-area-id="${areaId}"]`);
        visualizarArea(areaElement); // Atualiza a lista de automóveis da área
    }
}

// Função para fechar o modal de venda
function fecharModal() {
    document.getElementById('vender-modal').classList.add('hidden');
}
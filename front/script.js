const areas = {
    1: [], // Área 1 - vazia
    2: [
        { modelo: 'Fusca', preco: 15000 },
        { modelo: 'Civic', preco: 90000 }
    ],
    // Adicione mais áreas e carros conforme necessário
};

function visualizarArea(areaElement) {
    const areaId = areaElement.getAttribute('data-area-id');
    const carros = areas[areaId];

    const detalhesAreaDiv = document.getElementById('detalhes-area');
    detalhesAreaDiv.innerHTML = `<h2>Área ${areaId}</h2>`;

    if (carros.length === 0) {
        detalhesAreaDiv.innerHTML += '<p>A área está vazia.</p>';
    } else {
        carros.forEach((carro, index) => {
            detalhesAreaDiv.innerHTML += `
                <div>
                    <strong>Modelo:</strong> ${carro.modelo} <br>
                    <strong>Preço:</strong> R$ ${carro.preco.toFixed(2)} 
                    <button onclick="venderCarro('${carro.modelo}')">Vender</button>
                </div>
            `;
        });
    }

    detalhesAreaDiv.classList.remove('hidden');
}

function venderCarro(modelo) {
    const venderModal = document.getElementById('vender-modal');
    venderModal.innerHTML = `
        <h3>Venda de Automóvel</h3>
        <p>Modelo: ${modelo}</p>
        <button onclick="confirmarVenda('${modelo}')">Confirmar Venda</button>
        <button onclick="fecharModal()">Cancelar</button>
    `;
    venderModal.classList.remove('hidden');
}

function confirmarVenda(modelo) {
    alert(`Automóvel ${modelo} vendido com sucesso!`);
    fecharModal();
}

function fecharModal() {
    document.getElementById('vender-modal').classList.add('hidden');
    document.getElementById('detalhes-area').classList.add('hidden');
}

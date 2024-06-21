document.getElementById('portTestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ipAddress = document.getElementById('ipAddress').value;
    const ports = document.getElementById('ports').value;
// Validação de input. Reggex aceitando apenas 4 blocos de 4 bytes, sendo de 0 a 255 separado por pontos.
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    // Validação do endereço IP
    if (!ipPattern.test(ipAddress)) {
        loadingDiv.style.display = 'block';
        loadingDiv.textContent = 'Por favor, insira um endereço IP válido.';
        resultDiv.innerHTML = '';
        return;
    }

    loadingDiv.style.display = 'block';
    loadingDiv.textContent = 'Carregando...';
    resultDiv.innerHTML = '';

    fetch('backEnd/port_test.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'ipAddress=' + encodeURIComponent(ipAddress) + '&ports=' + encodeURIComponent(ports)
    })
    .then(response => response.json())
    .then(data => {
        loadingDiv.style.display = 'none';
        resultDiv.innerHTML = '';
        const accessiblePorts = data.filter(result => result.includes("acessível"));
        
        if (accessiblePorts.length > 0) {
            accessiblePorts.forEach(portResult => {
                let p = document.createElement('p');
                p.textContent = portResult;
                p.classList.add('result');
                resultDiv.appendChild(p);
            });
        } else {
            let p = document.createElement('p');
            p.innerHTML = `Não foi possível alcançar o ip ${ipAddress} em nenhuma das portas solicitadas.`;
            p.classList.add('red'); // ainda não está aplicando o estilo
            resultDiv.appendChild(p);
        }
    })
    .catch(error => {
        loadingDiv.style.display = 'none';
        loadingDiv.textContent = 'Ocorreu um erro ao testar as portas.';
        console.error('Erro:', error);
    });
});

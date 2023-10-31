const registros = []; // Array para armazenar os registros

function consultarCEP() {
    const cep = document.getElementById("cepInput").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            registros.push({
                cidade: data.localidade,
                bairro: data.bairro,
                estado: data.uf
            });

            exibirRegistros();
            exibirNoMapa(data.localidade, data.bairro, data.uf);
        })
        .catch(error => console.error(error));
}

function ordenarRegistros() {
    const ordenacao = document.getElementById("ordenacao").value;

    registros.sort((a, b) => {
        if (ordenacao === "cidadeCrescente" || ordenacao === "bairroCrescente" || ordenacao === "estadoCrescente") {
            return a[ordenacao] > b[ordenacao] ? 1 : -1;
        } else {
            return a[ordenacao] < b[ordenacao] ? 1 : -1;
        }
    });

    exibirRegistros();
}

function exibirRegistros() {
    const registrosList = document.getElementById("registros");
    registrosList.innerHTML = "";

    registros.forEach(registro => {
        const item = document.createElement("li");
        item.textContent = `Cidade: ${registro.cidade}, Bairro: ${registro.bairro}, Estado: ${registro.estado}`;
        registrosList.appendChild(item);
    });
}

function initMap() {
    const initialCoords = { lat: -14.235004, lng: -51.92528 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        center: initialCoords,
        zoom: 8
    });

    const addressCoords = { lat: -15.7801, lng: -47.9292 };

    const marker = new google.maps.Marker({
        position: addressCoords,
        map: map,
        title: 'Endereço Consultado'
    });
}

const map = L.map('map').setView([-14.235004, -51.92528], 8); // Defina as coordenadas iniciais e o nível de zoom

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // Nível de zoom máximo
}).addTo(map);

const marker = L.marker([-15.7801, -47.9292]).addTo(map);
marker.bindPopup('Endereço Consultado').openPopup(); // Adicione um marcador e uma caixa de informações

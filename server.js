const axios = require('axios');

// Fun��o para obter informa��es de geocodifica��o
async function getGeocodingData(address) {
    try {
        const response = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados de geocodifica��o:', error);
        throw error;
    }
}

// Fun��o para obter informa��es meteorol�gicas
async function getWeatherForecast(latitude, longitude) {
    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter previs�o do tempo:', error);
        throw error;
    }
}

// Exemplo de uso das fun��es
async function main() {
    try {
        // Obter dados de geocodifica��o
        const geocodingData = await getGeocodingData('San Francisco, CA');

        if (Array.isArray(geocodingData) && geocodingData.length > 0) {
            // Extrair latitude e longitude do primeiro resultado de geocodifica��o
            const latitude = geocodingData[0].lat;
            const longitude = geocodingData[0].lon;

            // Obter previs�o do tempo
            const weatherForecast = await getWeatherForecast(latitude, longitude);

            //console.log('DadosDeGeocodificacao:', geocodingData);
            console.log('PrevisaoDoTempo:', weatherForecast);
        } else {
            console.error('Nenhum resultado de geocodifica��o encontrado.');
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

main();

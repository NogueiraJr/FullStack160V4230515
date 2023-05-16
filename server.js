const axios = require('axios');

// Função para obter informações de geocodificação
async function getGeocodingData(address) {
    try {
        const response = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados de geocodificação:', error);
        throw error;
    }
}

// Função para obter informações meteorológicas
async function getWeatherForecast(latitude, longitude) {
    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter previsão do tempo:', error);
        throw error;
    }
}

// Exemplo de uso das funções
async function main() {
    try {
        // Obter dados de geocodificação
        const geocodingData = await getGeocodingData('San Francisco, CA');

        if (Array.isArray(geocodingData) && geocodingData.length > 0) {
            // Extrair latitude e longitude do primeiro resultado de geocodificação
            const latitude = geocodingData[0].lat;
            const longitude = geocodingData[0].lon;

            // Obter previsão do tempo
            const weatherForecast = await getWeatherForecast(latitude, longitude);

            //console.log('DadosDeGeocodificacao:', geocodingData);
            console.log('PrevisaoDoTempo:', weatherForecast);
        } else {
            console.error('Nenhum resultado de geocodificação encontrado.');
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

main();

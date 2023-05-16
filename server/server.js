const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const port = 3001;

// Use o middleware cors
app.use(cors());

// Rota para obter informa��es de geocodifica��o e previs�o do tempo
app.get('/weather-forecast', async (req, res) => {
    const address = req.query.address;

    try {
        // Obter dados de geocodifica��o
        const geocodingData = await getGeocodingData(address);

        if (Array.isArray(geocodingData) && geocodingData.length > 0) {
            // Extrair latitude e longitude do primeiro resultado de geocodifica��o
            const latitude = geocodingData[0].lat;
            const longitude = geocodingData[0].lon;

            // Obter previs�o do tempo
            const weatherForecast = await getWeatherForecast(latitude, longitude);

            res.json({
                geocodingData: geocodingData,
                weatherForecast: weatherForecast
            });
        } else {
            res.status(404).json({ error: 'Nenhum resultado de geocodifica��o encontrado.' });
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Erro ao processar a solicita��o.' });
    }
});

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

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

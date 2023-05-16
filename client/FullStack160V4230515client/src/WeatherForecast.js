import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/weather-forecast', {
                    params: {
                        address: 'London'
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Carregando...</div>;
    }

    if (data.error) {
        return <div>Erro: {data.error}</div>;
    }

    return (
        <div>
            <h2>Dados de geocodificação:</h2>
            <pre>{JSON.stringify(data.geocodingData, null, 2)}</pre>

            <h2>Previsão do tempo:</h2>
            <pre>{JSON.stringify(data.weatherForecast, null, 2)}</pre>
        </div>
    );
};

export default WeatherForecast;

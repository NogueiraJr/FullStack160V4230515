import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

const WeatherForecast = () => {
    const [data, setData] = useState(null);
    const [address, setAddress] = useState('');

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

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleConsultar = async () => {
        try {
            const response = await axios.get('http://localhost:3001/weather-forecast', {
                params: {
                    address: address
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
    };

    if (!data) {
        return <div>Carregando...</div>;
    }

    if (data.error) {
        return <div>Erro: {data.error}</div>;
    }

    const renderGeocodingData = () => {
        const { geocodingData } = data;

        return (
            <div>
                <h2>Dados de geocodificação:</h2>
                <table style={tableStyle}>
                    <thead>
                            <tr>
                            <th style={tableHeaderStyle}>Latitude</th>
                            <th style={tableHeaderStyle}>Longitude</th>
                            <th style={tableHeaderStyle}>Nomes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {geocodingData.map((item, index) => (
                            <tr key={index} style={tableRowStyle}>
                                <td style={tableCellStyle}>{Number(item.lat).toFixed(7)}</td>
                                <td style={tableCellStyle}>{Number(item.lon).toFixed(7)}</td>
                                <td style={tableCellStyle}>{item.display_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        );
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const tableHeaderStyle = {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
        borderBottom: '1px solid #ddd',
        borderRight: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
    };

    const tableRowStyle = {
        borderBottom: '1px solid #ddd',
    };

    const tableCellStyle = {
        padding: '8px',
        borderRight: '1px solid #ddd',
        textAlign: 'center',
    };

    const renderWeatherForecast = () => {
        const { weatherForecast } = data;
        return (
            <div>
                <h2>Previsão do tempo do local consultado:</h2>
                <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr style={{ border: '1px solid black' }}>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Latitude</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Longitude</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Fuso horário</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Elevação</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Temperatura</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Velocidade do vento</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Direção do vento</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>É dia</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Quando</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ border: '1px solid black' }}>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{Number(weatherForecast.latitude).toFixed(7)}</td>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{Number(weatherForecast.longitude).toFixed(7)}</td>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{weatherForecast.timezone}</td>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{weatherForecast.elevation}</td>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{weatherForecast.current_weather.temperature}</td>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{weatherForecast.current_weather.windspeed}</td>
                            <td style = {{ border: '1px solid black', textAlign: 'center' }}>{weatherForecast.current_weather.winddirection}</td>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>
                                {weatherForecast.current_weather.is_day === 1 ? 'Sim' : 'Não'}
                            </td>

                        <td style={{ border: '1px solid black', textAlign: 'center' }}>
                            {format(new Date(weatherForecast.current_weather.time), 'dd/MM/yyyy HH:mm:ss')}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

return (
    <div>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
            <label htmlFor="address" style={{ marginRight: '10px' }}>Localidade:</label>
            <input type="text" id="address" value={address} onChange={handleAddressChange} style={{ marginRight: '10px' }} />
            <button onClick={handleConsultar}>Consultar</button>
        </div>
        {renderGeocodingData()}
        {renderWeatherForecast()}
    </div>
);
};

export default WeatherForecast;
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');

    const apiKey = 'a72b6130d256d628c472146256858e8e'; // Reemplaza con tu API key

    function searchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('No se pudo obtener la información del clima para la ciudad ingresada.');
            });
    }

    function displayWeather(data) {
        cityElement.textContent = data.name;
        temperatureElement.textContent = `${data.main.temp}°C`;
        descriptionElement.textContent = data.weather[0].description;
        humidityElement.textContent = `${data.main.humidity}% de humedad`;
    }

    // Event listener para buscar clima al presionar Enter
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const city = searchInput.value.trim();
            if (city !== '') {
                searchWeather(city);
            } else {
                alert('Por favor ingrese una ciudad');
            }
        }
    });

    // Event listener para buscar clima al hacer clic en el botón
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function() {
        const city = searchInput.value.trim();
        if (city !== '') {
            searchWeather(city);
        } else {
            alert('Por favor ingrese una ciudad');
        }
    });
});

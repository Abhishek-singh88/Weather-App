const apiKey = 'bdedb1c75d989f634f1f2b32bd6ab555';
const searchHistory = [];

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherOutput = document.getElementById('weatherOutput');

    if (!city.trim()) {
        alert('Please enter a valid city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        const { name, sys, main, weather, wind } = data;

        const countryFlag = `https://flagcdn.com/w80/${sys.country.toLowerCase()}.png`;

        weatherOutput.innerHTML = `
            <h2>${name}, ${sys.country} <img src="${countryFlag}" alt="${sys.country}" class="flag"></h2>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
            <p>${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}</p>
            <p>🌡️ Temp: ${main.temp}°C (Feels like: ${main.feels_like}°C)</p>
            <p>💧 Humidity: ${main.humidity}%</p>
            <p>🌬️ Wind: ${wind.speed} m/s</p>
            <p>🕒 Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>🌅 Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        `;

        weatherOutput.style.display = 'block';

        updateSearchHistory(city);

    } catch (error) {
        weatherOutput.innerHTML = `<p>${error.message}</p>`;
        weatherOutput.style.display = 'block';
    }
}

function updateSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        document.getElementById('searchHistory').innerHTML = `
            <p>Recent Searches: ${searchHistory.join(', ')}</p>
        `;
    }
}

const apiKey = "85f60dc2562a6848c2e8db03233099af"; // Replace with your OpenWeatherMap API key
const submitBtn = document.getElementById('submitBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMessage = document.getElementById('errorMessage');
const card = document.getElementById("card");

submitBtn.addEventListener('click', async () => {
    const city = cityInput.value;
    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }
    errorMessage.textContent = ''; // Clear previous error messages
    await fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherDisplay.innerHTML = ''; // Clear previous weather data
    }
}

function displayWeatherData(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherDisplay.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    `;
}

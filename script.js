// Fetch countries from RestCountries API
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => displayCountries(countries))
    .catch(error => console.error('Error fetching countries:', error));

function displayCountries(countries) {
    const countriesContainer = document.getElementById('countries-container');

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('col-lg-4', 'col-sm-12', 'mb-4');
        countryCard.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <img src="${country.flags.svg}" class="card-img-top" alt="Flag of ${country.name.common}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p class="card-text">Region: ${country.region}</p>
                    <p class="card-text">Lat/Lng: ${country.latlng.join(', ')}</p>
                    <button class="btn btn-primary" onclick="getWeather('${country.latlng[0]}', '${country.latlng[1]}', '${country.name.common}')">Click for Weather</button>
                </div>
            </div>
        `;
        countriesContainer.appendChild(countryCard);
    });
}

// Fetch weather from OpenWeatherMap API 3.0 (One Call API)
function getWeather(lat, lon, countryName) {
    const apiKey = '2a84d6ca2e45e8b8d1153909daf335f9'; // Replace with your actual API key
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching weather: ${response.statusText}`);
            }
            return response.json();
        })
        .then(weather => {
            const description = weather.current.weather[0].description;
            const temp = weather.current.temp;
            alert(`Weather in ${countryName}: ${description}, Temp: ${temp.toFixed(2)} °C`);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}



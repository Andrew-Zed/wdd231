// Weather API Integration

function getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

document.addEventListener('DOMContentLoaded', () => {
    // OpenWeatherMap API credentials
    const apiKey = 'c743ce486802f958fb9a496947f4ef5f'; 
    const city = 'Timbuktu,ml'; // Location for the Chamber (with country code)
    const units = 'imperial'; // Imperial units for Fahrenheit
    
    // Function to capitalize each word in a string
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }
    
    // Function to fetch current weather data
    async function fetchCurrentWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
            
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            
            const data = await response.json();
            displayCurrentWeather(data);
        } catch (error) {
            console.error('Error fetching current weather:', error);
            displayWeatherError();
        }
    }
    
    // Function to fetch forecast data
    async function fetchForecast() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`);
            
            if (!response.ok) {
                throw new Error('Forecast data not available');
            }
            
            const data = await response.json();
            displayForecast(data);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            displayForecastError();
        }
    }
    
    // Function to display current weather
    function displayCurrentWeather(data) {
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('weather-description');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('wind-speed');
        const weatherIconElement = document.getElementById('weather-icon');
        
        // Get all weather events (there may be more than one)
        const weatherEvents = data.weather;
        const descriptions = weatherEvents.map(event => capitalizeWords(event.description)).join(', ');
        
        // Update DOM elements
        temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
        descriptionElement.textContent = descriptions;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind: ${Math.round(data.wind.speed)} mph`;
        
        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIconElement.src = getWeatherIconUrl(iconCode);
        weatherIconElement.alt = descriptions;
    }
    
    // Function to display 3-day forecast
    function displayForecast(data) {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';
        
        // Get data for next 3 days (excluding today)
        // OpenWeatherMap provides forecast in 3-hour steps, so we need to filter for midday of each day
        const dailyForecasts = {};
        const today = new Date().getDate();
        
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.getDate();
            
            // Skip today
            if (day !== today) {
                // Use noon forecast for each day (or closest to noon)
                const hours = date.getHours();
                if (!dailyForecasts[day] || Math.abs(hours - 12) < Math.abs(dailyForecasts[day].hours - 12)) {
                    dailyForecasts[day] = {
                        temp: item.main.temp,
                        icon: item.weather[0].icon,
                        description: item.weather[0].description,
                        date: date,
                        hours: hours
                    };
                }
            }
        });
        
        // Create forecast cards for the next 3 days
        const nextThreeDays = Object.values(dailyForecasts).slice(0, 3);
        
        nextThreeDays.forEach(forecast => {
            const dayName = getDayName(forecast.date);
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            
            const dayElement = document.createElement('p');
            dayElement.textContent = dayName;
            dayElement.style.fontWeight = 'bold';
            
            const tempElement = document.createElement('p');
            tempElement.textContent = `${Math.round(forecast.temp)}°F`;
            
            const iconElement = document.createElement('img');
            iconElement.src = `https://openweathermap.org/img/wn/${forecast.icon}.png`;
            iconElement.alt = capitalizeWords(forecast.description);
            iconElement.width = 50;
            iconElement.height = 50;
            
            forecastDay.appendChild(dayElement);
            forecastDay.appendChild(iconElement);
            forecastDay.appendChild(tempElement);
            
            forecastContainer.appendChild(forecastDay);
        });
    }
    
    // Helper function to get day name
    function getDayName(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }
    
    // Error handling functions
    function displayWeatherError() {
        const weatherContainer = document.querySelector('.current-weather');
        weatherContainer.innerHTML = `
            <p class="error-message">
                Weather data is currently unavailable. Please check back later.
            </p>
        `;
    }
    
    function displayForecastError() {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = `
            <p class="error-message">
                Forecast data is currently unavailable. Please check back later.
            </p>
        `;
    }
    
    // For development/testing when API key is not available
    function useMockWeatherData() {
        // Mock current weather data
        const mockCurrentWeather = {
            main: {
                temp: 90,
                humidity: 34
            },
            weather: [
                {
                    description: "partly cloudy",
                    icon: "02d"
                }
            ],
            wind: {
                speed: 5.2
            }
        };
        
        // Mock forecast data
        const mockForecast = {
            list: [
                // Tomorrow
                {
                    dt: new Date().setDate(new Date().getDate() + 1),
                    main: {
                        temp: 89
                    },
                    weather: [{
                        description: "clear sky",
                        icon: "01d"
                    }]
                },
                // Day after tomorrow
                {
                    dt: new Date().setDate(new Date().getDate() + 2),
                    main: {
                        temp: 85
                    },
                    weather: [{
                        description: "few clouds",
                        icon: "02d"
                    }]
                },
                // Three days from now
                {
                    dt: new Date().setDate(new Date().getDate() + 3),
                    main: {
                        temp: 68
                    },
                    weather: [{
                        description: "light rain",
                        icon: "10d"
                    }]
                }
            ]
        };
        
        displayCurrentWeather(mockCurrentWeather);
        
        // Process mock forecast data to match the structure expected by displayForecast
        const mockProcessedForecast = {
            list: []
        };
        
        mockForecast.list.forEach(day => {
            const date = new Date(day.dt);
            mockProcessedForecast.list.push({
                dt: day.dt / 1000, // Convert to seconds
                main: day.main,
                weather: day.weather
            });
        });
        
        displayForecast(mockProcessedForecast);
    }
    
    // Try to fetch weather data, or use mock data if API key is not available
    try {
        if (apiKey && navigator.onLine) {
            fetchCurrentWeather();
            fetchForecast();
        } else {
            console.warn('Using mock weather data. Replace with your API key for live data.');
            alert('You are offline! Turn on yout network to get live data')
            useMockWeatherData();
        }
    } catch (error) {
        console.error('Error initializing weather functionality:', error);
        alert('Server not able to return live data')
        useMockWeatherData();
    }
});
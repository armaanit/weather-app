document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "78adc4e4d08161f010d64ae36e4c93c9";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        document.getElementById(
          "weatherData"
        ).innerHTML = `<p>City not found!</p>`;
        document.body.className = ""; // Reset background if not found
      } else {
        const weather = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Displaying weather data
        const weatherHTML = `
                    <p><strong>Weather:</strong> ${weather}</p>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                `;
        document.getElementById("weatherData").innerHTML = weatherHTML;

        // Setting background class based on weather condition
        setBackground(weather);
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function setBackground(weather) {
  // Reset all background classes
  document.body.className = "";

  if (weather.includes("clear")) {
    document.body.classList.add("clear");
  } else if (weather.includes("cloud")) {
    document.body.classList.add("cloudy");
  } else if (weather.includes("rain")) {
    document.body.classList.add("rainy");
  } else if (weather.includes("snow")) {
    document.body.classList.add("snowy");
  } else if (weather.includes("mist")) {
    document.body.classList.add("mist");
  } else {
    document.body.classList.add("sunny");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  } else {
    showError("Geolocation is not supported by this browser.");
  }
}

function getWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Replace 'YOUR_API_KEY' with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = document.getElementById("weather-info");
      weatherInfo.innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
            `;
    })
    .catch((error) => showError("Unable to fetch weather data."));
}

function showError(error) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `<h2>${error}</h2>`;
}

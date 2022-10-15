let now = new Date();
let currentDate = document.querySelector("#date");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
currentDate.innerHTML = `${day}, ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Forecast//
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
       <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperature">
            <span class="weather-temperature-max"><strong>${Math.round(
              forecastDay.temp.max
            )}º</strong></span>
            <span class="weather-temperature-min">${Math.round(
              forecastDay.temp.min
            )}º</span>
        </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Forecast//
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Search Engine//
function displayWeather(response) {
  console.log(response.data);
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#visibility").innerHTML =
    response.data.visibility / 1000;
  document.querySelector("#weather-main").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector(".sun");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function city(event) {
  event.preventDefault();
  let cityIdInput = document.querySelector("#city-name");
  let cityId = cityIdInput.value;
  let apiKey = "b3575525466decb09d8082ab1a0c7f6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  //let cityInput = document.querySelector("#city-name");
  //let currentCity = document.querySelector("#city-current");
  //currentCity.innerHTML = cityInput.value;
}

let form = document.querySelector("#submit");
form.addEventListener("click", city);

//Temperature//
function fahrenheitConvert(event) {
  event.preventDefault();
  let fah = celsiusTemperature * 1.8 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fah);
}

function celsiusConvert(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConvert);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConvert);

//Your Location//
function searchLocation(position) {
  let apiKey = "b3575525466decb09d8082ab1a0c7f6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let yourLocationButton = document.querySelector("#location");
yourLocationButton.addEventListener("click", displayLocation);

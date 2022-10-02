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

//Search Engine
function displayWeather(response) {
  //console.log(response.data);
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

//Temperature
function celsiusConvert(event) {
  event.preventDefault();
  let cel = document.querySelector("#temperature");
  cel.innerHTML = 22;
}
function fahrenheitConvert(event) {
  event.preventDefault();
  let fah = document.querySelector("#temperature");
  fah.innerHTML = 22 * 1.8 + 32;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConvert);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConvert);

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

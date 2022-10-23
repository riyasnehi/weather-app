// display the current date and time
let now = new Date();

let date = now.getDate();
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
let hour = now.getHours();
let minutes = now.getMinutes();
let period = "AM";
if (hour > 12) {
  period = "PM";
  hour = hour - 12;
} else {
  period = "AM";
}
if (hour < 10) {
  hour = `0${hour}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayShow = document.querySelector("#time");
dayShow.innerHTML = `${day}, ${hour}:${minutes} ${period}`;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let dateShow = document.querySelector("#date");
dateShow.innerHTML = `${month} ${date}, ${year}`;

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let detail = document.querySelector("#description");
  detail.innerHTML = response.data.weather[0].main;
}

function searchWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityMain = document.querySelector("#city");
  cityMain.innerHTML = cityInput.value;

  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${url}?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${url}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("click", searchWeather);
let formButton = document.querySelector("#submit");
formButton.addEventListener("submit", searchWeather);

let location = document.querySelector("#current-location");
location.addEventListener("click", getPosition);

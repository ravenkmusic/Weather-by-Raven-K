let now = new Date();

function currentTime() {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthsOfTheYear = [
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

  let month = monthsOfTheYear[now.getMonth()];

  let date = now.getDate();

  let year = now.getFullYear();

  let day = weekDay[now.getDay()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = ` 0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${date}, ${year} at ${hour}:${minutes}`;
}

let time = document.querySelector("#time");
time.innerHTML = currentTime(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<h4 class="five-day-forecast">5-Day Forecast (°C)</h4><div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
      <div class="day"><h6>${formatDay(forecastDay.dt)}</h6>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt= "" width= "40">
      </div>
      <span class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </span>
         </div>
         
         `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `c789e765c19e78f4b69ede7112f55431`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let city = document.querySelector("#currentcity");
  city.innerHTML = response.data.name;

  let weatherCondition = document.querySelector("#description");
  weatherCondition.innerHTML = response.data.weather[0].description;

  celsiusTemp = response.data.main.temp;
  celsiusHighTemp = response.data.main.temp_max;
  celsiusLowTemp = response.data.main.temp_min;

  let temperature = document.querySelector("#currentweather");
  temperature.innerHTML = Math.round(celsiusTemp);

  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = Math.round(celsiusHighTemp);

  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = Math.round(celsiusLowTemp);

  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = response.data.weather[0].main;

  let windSpeed = document.querySelector("#windspeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconImage = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconImage}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "c789e765c19e78f4b69ede7112f55431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  search(cityName.value);
}

function displayFahr(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentweather");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrTemp);

  let lowTemperature = document.querySelector("#low");
  let lowFahrTemp = (celsiusLowTemp * 9) / 5 + 32;
  lowTemperature.innerHTML = Math.round(lowFahrTemp);

  let highTemperature = document.querySelector("#high");
  let highFahrTemp = (celsiusHighTemp * 9) / 5 + 32;
  highTemperature.innerHTML = Math.round(highFahrTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentweather");
  currentTemperature.innerHTML = Math.round(celsiusTemp);

  let lowTemperature = document.querySelector("#low");
  lowTemperature.innerHTML = Math.round(celsiusLowTemp);

  let highTemperature = document.querySelector("#high");
  highTemperature.innerHTML = Math.round(celsiusHighTemp);
}

function exactLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c789e765c19e78f4b69ede7112f55431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function exactButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(exactLocation);
}

let exact = document.querySelector("#exact-button");
exact.addEventListener("click", exactButton);

let celsiusTemp = null;
let celsiusLowTemp = null;
let celsiusHighTemp = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let currentFahr = document.querySelector("#current-fahr");
currentFahr.addEventListener("click", displayFahr);

let currentCels = document.querySelector("#current-celsius", "#high-low-fahr");
currentCels.addEventListener("click", displayCelsius);

search("New York");

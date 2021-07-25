let now = new Date();
console.log(now);

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
  console.log(weekDay);

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
  console.log(monthsOfTheYear);

  let month = monthsOfTheYear[now.getMonth()];
  console.log(month);

  let date = now.getDate();
  console.log(date);

  let year = now.getFullYear();
  console.log(year);

  let day = weekDay[now.getDay()];
  console.log(day);

  let hour = now.getHours();
  if (hour < 10) {
    hour = ` 0${hour}`;
  }
  console.log(hour);

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  console.log(minutes);

  return `${day}, ${month} ${date}, ${year} at ${hour}:${minutes}`;
}

let time = document.querySelector("#time");
time.innerHTML = currentTime(now);

function showTemp(response) {
  console.log(response.data);

  let city = document.querySelector("#currentcity");
  city.innerHTML = response.data.name;

  let weatherCondition = document.querySelector("#description");
  weatherCondition.innerHTML = response.data.weather[0].description;

  celsiusTemp = response.data.main.temp;
  console.log(celsiusTemp);
  celsiusHighTemp = response.data.main.temp_max;
  console.log(celsiusHighTemp);
  celsiusLowTemp = response.data.main.temp_min;
  console.log(celsiusLowTemp);

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
  console.log(cityName.value);
}

function displayFahr(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentweather");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrTemp);
  console.log(fahrTemp);

  let lowTemperature = document.querySelector("#low");
  let lowFahrTemp = (celsiusLowTemp * 9) / 5 + 32;
  lowTemperature.innerHTML = Math.round(lowFahrTemp);
  console.log(lowFahrTemp);

  let highTemperature = document.querySelector("#high");
  let highFahrTemp = (celsiusHighTemp * 9) / 5 + 32;
  highTemperature.innerHTML = Math.round(highFahrTemp);
  console.log(highFahrTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentweather");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  console.log(currentTemperature);

  let lowTemperature = document.querySelector("#low");
  lowTemperature.innerHTML = Math.round(celsiusLowTemp);

  let highTemperature = document.querySelector("#high");
  highTemperature.innerHTML = Math.round(celsiusHighTemp);
}

let celsiusTemp = null;
let celsiusLowTemp = null;
let celsiusHighTemp = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let currentFahr = document.querySelector("#current-fahr");
currentFahr.addEventListener("click", displayFahr);

let currentCels = document.querySelector("#current-celsius", "#high-low-fahr");
currentCels.addEventListener("click", displayCelsius);

search("Baltimore");

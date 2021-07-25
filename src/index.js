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

  let temperature = document.querySelector("#currentweather");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = Math.round(response.data.main.temp_max);

  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);

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

let apiKey = "c789e765c19e78f4b69ede7112f55431";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTemp);

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

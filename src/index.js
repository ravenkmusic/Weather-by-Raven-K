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

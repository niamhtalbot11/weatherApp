function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
 
    let currentDay = days[date.getDay()];
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
  
    return ` ${currentDay}  ${currentHour}:${currentMinute}`;
  }
 
  let now = new Date();
  document.querySelector(".currentDate").innerHTML = formatDate(now);
 
  //Geolocation
 
  function displayWeather(response){
   document.querySelector(".city").innerHTML = response.data.name;
   document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
   document.querySelector(".weatherDescription").innerHTML = response.data.weather[0].description;
   document.querySelector(".humidity").innerHTML= Math.round(response.data.main.humidity);
   document.querySelector(".windSpeed").innerHTML = Math.round(response.data.wind.speed);
   celsiusTemperature = response.data.main.temp;
   iconElement = document.querySelector("#mainIcon");
   iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );
 
  }
  function search(event) {
    event.preventDefault();
   let cityInputElement = document.querySelector("#searchBar").value;
   searchFunction(cityInputElement);
  }
 
  function searchFunction (city) {
    let apiKey= "29d1bf7ff9e07cdab460b43caa4c25ca";
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  searchFunction("Dublin");
  function retrievePosition(position){
   console.log(position.coords.lat);
   console.log(position.coords.lon);
   let lat = position.coords.latitude;
   let lon = position.coords.longitude;
   let apiKey = "29d1bf7ff9e07cdab460b43caa4c25ca";
   let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
 //current location button
  function showCurrentLocation(event){
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(retrievePosition);
  }

function convertToFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

 let form = document.querySelector(".searchForm");
 form.addEventListener("submit",search);

let currentLocationButton = document.querySelector(".currentLocationButton")
currentLocationButton.addEventListener("click", showCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);



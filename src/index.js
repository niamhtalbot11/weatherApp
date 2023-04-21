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



// day for weekly forecast
  function formatDay(timestamp){
let date = new Date (timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed","Thur","Fri","Sat"]
return days[day];
  }


function displayForecast(response){
  console.log(response.data.daily);
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML =`<div class="row">`;
    forecast.forEach(function (forecastDay, index){
      if (index < 6) {
      forecastHTML =
      forecastHTML + 
      `

      <div class="col-2">
      <div class="weather-forecast-day">${formatDay(forecastDay.time)}</div>
      <img
      src="
      http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="42"
      id="#forecast-img"
    />

    <div class="weather-forecast-temperatures">

    <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}
    º</span>
      
    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}
    º</span>
        
    </div>
    </div>
      `;
      }
      });
    forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey ="41c1d9b9a93t238a49ob3d17fa62cf09";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}

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
   getForecast(response.data.coord);
   }
  
  //city input
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

  //current location api 

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

//convert to fahrenheit

function convertToFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
//convert to celsius

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



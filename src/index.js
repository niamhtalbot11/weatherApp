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
   console.log(response);
   document.querySelector(".city").innerHTML = response.data.name;
   document.querySelector(".temp").innerHTML = Math.round (response.data.main.temp);
   document.querySelector(".weatherDescription").innerHTML = response.data.weather[0].description;
   document.querySelector(".humidity").innerHTML= Math.round(response.data.main.humidity);
   document.querySelector(".windSpeed").innerHTML = Math.round(response.data.wind.speed);
  }
 
  function search(event) {
   event.preventDefault();
  let city = document.querySelector("#searchBar").value;
 
  searchFunction(city);
 }
 
  function searchFunction (city) {
    let apiKey= "29d1bf7ff9e07cdab460b43caa4c25ca";
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
 
  let form = document.querySelector(".searchForm");
  form.addEventListener("submit",search);
 
  function retrievePosition(position){
   console.log(position.coords.lat);
   console.log(position.coords.lon);
   let lat = position.coords.latitude;
   let lon = position.coords.longitude;
   let apiKey = "29d1bf7ff9e07cdab460b43caa4c25ca";
   let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
 
  function showCurrentLocation(event){
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(retrievePosition);
  }
 
  let currentLocationButton = document.querySelector(".currentLocationButton")
  currentLocationButton.addEventListener("click", showCurrentLocation);
  
 
 searchFunction("Dublin");
 
 
 
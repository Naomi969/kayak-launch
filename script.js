// MAP INTEGRATION
function initMap() {
  var somewhereNearMandale = { lat: 35.8268180464077, lng: -79.2584376142173 }
  //  ^^^ this can be any variable with an array of lat/long object values
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: somewhereNearMandale,
  });
  const marker = new google.maps.Marker({
    position: somewhereNearMandale,
    map: map,
  });
};

// //Current Weather function//
var date = moment().format("L");
var key = '957c1d427eb08dc32b2d83caeea47227'
var storeCity = [];
function curWeather(storeCity) {
  console.log('cur weather called!!!!!! ', storeCity)
  var qUrl = `https://api.openweathermap.org/data/2.5/weather?q=${storeCity}&units=imperial&appid=957c1d427eb08dc32b2d83caeea47227`;

  fetch(qUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var icon = data.weather[0].icon;
      var iUrl = `https://openweathermap.org/img/wn/${icon}.png`;
      var cityData = $(`
                     <h3> ${data.name}  ${date} <img src="${iUrl}" alt="${data.weather[0].description}"</h3>
                     <p> Current Temp: ${data.main.temp}\u00B0 F </p>
                     <p> Wind Speed:  ${data.wind.speed} mph </p>
                     <p> Humidity: ${data.main.humidity} \% </p>`);
      $("#weather").append(cityData);
      getTrailandforcastdat(data.coord.lat, data.coord.lon)
    })
};

//Add primary search (city) from page1 to local storage

$("#john").on("click", function (event) {
  var userCity = $("#userInput").val();
  storeCity.push(userCity);
  localStorage.setItem("cities", JSON.stringify(storeCity))
  displayCityBtn();
  curWeather(userCity);


  window.location.href = 'index2.html'

});

$('#userChoiceBtn').on('click', function (event) {
  var userCit = $('#userInput').val();
  storeCity.push(userCit);
  localStorage.setItem('cities', JSON.stringify(storeCity))
  displayCityBtn();
  curWeather(userCit)
})
//load saved cities from local storage
function loadCity() {
  var savedCity = localStorage.getItem("cities");

  console.log('saved city? ', savedCity)
  if (savedCity) {
    city = JSON.parse(savedCity);
    city.reverse();

    console.log('what are you ', city)
    curWeather(city[0]);
  }

};

//displays saved recent searches as button in Recent Searches on page1
function displayCityBtn() {

  for (var i = 0; i < storeCity.length; i++) {
    var newBtn = $("<button>");
    newBtn.attr("type", "button");
    newBtn.attr("class", "list-group-item list-group-item-action cityBtn");
    newBtn.attr("data-cityName", storeCity[i]);
    newBtn.text(storeCity[i])

    $("#Box").append(newBtn);
  }
  localStorage.setItem('cities', JSON.stringify(storeCity));
};



// info to allow lat and lon to grab location, as well as info for trrails
var API_KEY = '10e1f68a65cde5b6f69c3c18e862cb60';
// var longitude = -78.509323;
// var latitude = 35.979309;
function getTrailandforcastdat(latitude, longitude) {
  fetch(
    `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=${longitude}&lat=${latitude}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key':
          'KyNZyDwQySmsh71Zva51yAb90PL8p1YmArmjsns2ZSMTE7P2js',
        'x-rapidapi-host': 'trailapi-trailapi.p.rapidapi.com',
      },
    }
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log('data!!?!?! ', data);
    })
    .catch((err) => {
      console.error(err);
    });

  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  fetch(apiUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      // List of all return data
      console.log(data.timezone);
      // List of Current Weather Info
      // console.log(data.current)
      // console.log(data.daily);
      // console.log(`UVI: ${data.current.uvi}`);
      // console.log(`TEMP: ${data.current.temp}`);
      // console.log(`WIND_SPEED: ${data.current.wind_speed}`);
      // console.log(`HUMIDITY: ${data.current.humidity}`);
      var curWeatherContainer = $('#cur-weather-container');
      console.log('curWeatherContainer:', curWeatherContainer);
      curWeatherContainer.append(`<h1>Temperature ${data.current.temp}</h1>`);
      curWeatherContainer.append(`<h1>UV Index ${data.current.uvi}</h1>`);
      curWeatherContainer.append(`<h1>Wind Speed ${data.current.wind_speed}</h1>`);
      curWeatherContainer.append(`<h1>Humidity ${data.current.humidity}</h1>`);


    });
}
//curWeather("Raleigh")
loadCity()

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

//Current Weather function//
 var date = moment().format("L");
 var key = '957c1d427eb08dc32b2d83caeea47227'
 var storeCity = [];
 function curWeather(storeCity) {
   console.log(`curWeather is running`);
     var qUrl = `https://api.openweathermap.org/data/2.5/weather?q=${storeCity}&units=imperial&appid=957c1d427eb08dc32b2d83caeea47227`;
     
     fetch(qUrl)
     .then(function(response) {
         return response.json();
     })
     .then(function (data){
         var icon = data.weather[0].icon;
         var iUrl = `https://openweathermap.org/img/wn/${icon}.png`;
            var cityData = $(`
                     <h3> ${data.name}  ${date} <img src="${iUrl}" alt="${data.weather[0].description}"</h3>
                     <p> Current Temp: ${data.main.temp}\u00B0 F </p>
                     <p> Wind Speed:  ${data.wind.speed} mph </p>
                     <p> Humidity: ${data.main.humidity} \% </p>`);
          var userCityLng = data.coord.lon
          var userCityLat = data.coord.lat
          console.log(`userCity Longitude, Latitude:  ${userCityLng}, ${userCityLat}`)
          getTrailList(userCityLng, userCityLat)
          console.log('weather', data);
          $("#weather").append(cityData);

     })
   
};

//Add primary search (city) from page1 to local storage

$("#john").on("click", function (event) {
  var userCity = $("#userInput").val();
  console.log(`CITY ENTERED: ${userCity}`);
  storeCity.push(userCity);
  localStorage.setItem("cities", JSON.stringify(storeCity))
  displayCityBtn();
  curWeather(userCity);
  $("#weather").append(cityData);
  
  // getTrailandforcastdat(data.coord.lat, data.coord.lon


  window.location.href = 'index2.html'

});

function insert() {
  var order = document.getElementById("#order");
  var lsit = document.createElement("li");
  lsit.appendChild(document.createTextNode("#userInput"));
}

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
    
    for (var i = 0; i < storeCity.length; i++){
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
  // var API_KEY = '10e1f68a65cde5b6f69c3c18e862cb60';

function getTrailList(userCityLng,userCityLat) {
  console.log(`getTrailList is running`)
  var requestTrailList = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=${userCityLng}&lat=${userCityLat}`
  fetch(requestTrailList, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "KyNZyDwQySmsh71Zva51yAb90PL8p1YmArmjsns2ZSMTE7P2js",
      "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
    }
  })
    .then(function (response) {
      console.log(response.status);
      if (response.ok) {
        console.log(`response to TrailsAPI was OK`);
        response.json().then(function (data) {
          console.log(`DATA FROM TRAILSAPI FETCH:  ${data}`);
          console.log(`LENGTH OF DATA FROM TRAILSAPI FETCH:  ${data.results}`);
          // var coOrdinatesPair = []
          var coOrdinatesList = [];
          var coOrds
          if (data.results > 5) {
            for (let i = 0; i < 5; i++) {
              var coOrdsLon = data.data[i].lon;
              var coOrdsLat = data.data[i].lat;
              console.log(`ITERATION ${i} | LON:  ${coOrdsLon}`);
              console.log(`ITERATION ${i} | LON:  ${coOrdsLat}`);
              let coOrdinatesPair = [coOrdsLon, coOrdsLat];
              coOrdinatesList.push([coOrdinatesPair]);
              console.log(`> 5 coOrdinatesList --> ${coOrdinatesList}`)
            } 
          } else if (data.results <= 5 && data.results > 0) {
            for (let i = 0; i < data.results.length; i++) {
              var coOrdsLon = data.data[i].lon;
              var coOrdsLat = data.data[i].lat;
              console.log(`ITERATION ${i} | LON:  ${coOrdsLon}`);
              console.log(`ITERATION ${i} | LON:  ${coOrdsLat}`);
              let coOrdinatesPair = [coOrdsLon, coOrdsLat];
              coOrdinatesList.push([coOrdinatesPair]);
              console.log(`<= 5 coOrdinatesList --> ${coOrdinatesList}`)
            }
          } else {
            // modal here displaying "NO RESULTS FOUND"
            console.log(`NO RESULTS FOUND AT THIS LOCATION`);
          }
          console.log(`FINAL coOrdinatesList:  ${coOrdinatesList}`)
          return coOrdinatesList
        })
      }
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

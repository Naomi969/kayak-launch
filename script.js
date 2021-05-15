var coOrdinatesCenter
var map;
var marker;
var markerPosition;
var coOrdinatesList = [];
var coOrdinateExtract;
var coOrdinatesMarker = [];
var coOrdinatesMarkerList = [];
var bounds;
var markerContent;

// EXAMPLE COORDINATES:
// var testLatLon = { lat: 35.8268180464077, lng: -79.2584376142173 }
// var coOrdinatesCenter = { lat: userCityLat, lng: userCityLng }

// MAP INTEGRATION

function initMap(coOrdinatesCenter, coOrdinatesList) {
  bounds = new google.maps.LatLngBounds();

  //markerContent = 

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: coOrdinatesCenter,
  });
  console.log(`INSIDE initMap | coOrdinatesList LENGTH:  ${coOrdinatesList.length}`)
  for (let i = 0; i < coOrdinatesList.length; i++) {
    coOrdinateExtractLat = coOrdinatesList[i].lat;
    coOrdinateExtractLng = coOrdinatesList[i].lng;
    coOrdinatesMarker = `${parseFloat(coOrdinateExtractLat)}, ${parseFloat(coOrdinateExtractLng)}`;
    markerPosition = new google.maps.LatLng(parseFloat(coOrdinateExtractLat), parseFloat(coOrdinateExtractLng));
    bounds.extend(markerPosition);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(coOrdinateExtractLat), parseFloat(coOrdinateExtractLng)),
      map: map,
      //title: `LOCATION ${[i]}`
    });
    ;
  };
  marker = new google.maps.Marker({
    position: coOrdinatesCenter,
    map: map,
  });
  map.fitBounds(bounds);
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

                     <h3>   ${date} <br> ${data.name}<img src="${iUrl}" alt="${data.weather[0].description}"</h3>
                     <p> Current Temp: <br>${data.main.temp}\u00B0 F </p>
                     <p> Wind Speed:  <br>${data.wind.speed} mph </p>
                     <p> Humidity: <br>${data.main.humidity} \% </p>`);
          $("#weather").append(cityData);
          var userCityLng = data.coord.lon
          var userCityLat = data.coord.lat
          coOrdinatesCenter = { lat: userCityLat, lng: userCityLng }
          //initMap(coOrdinatesCenter);
          console.log(`INSIDE curWeather | coOrdinatesCenter:  ${JSON.stringify(coOrdinatesCenter)}`);
          getTrailList(userCityLng, userCityLat)
          console.log('weather', data);
          return coOrdinatesCenter;

     })
};


//Add primary search (city) from page1 to local storage

$("#john").on("click", function (event) {
  var userCity = $("#userInput").val();
  console.log(`CITY ENTERED: ${userCity}`);
  storeCity.push(userCity);
  localStorage.setItem("cities", JSON.stringify(storeCity))
  window.location.href = 'index2.html'
  displayCityBtn();
  curWeather(userCity);
  window.location.href = 'index2.html'
  $("#weather").append(cityData);
  
  // getTrailandforcastdat(data.coord.lat, data.coord.lon






});

$('#userChoiceBtn').on('click', function (event) {
  var userCit = $('#userInput').val();
  storeCity.push(userCit);
  localStorage.setItem('cities', JSON.stringify(storeCity))
  document.getElementById("weather").innerHTML = "";
  displayCityBtn();
  document.getElementById('weather').innerHTML = ''
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


// WC Append Child

// function insert() {
//   var order = document.getElementById("#order");
//   var lsit = document.createElement("li");
//   lsit.setAttribute("id", "lsit");
//   lsit.appendChild(document.createTextNode("#userInput"));
//   document.getElementById("order").appendChild(lsit);
//   // order.appendChild(lsit);
// }

//displays saved recent searches as button in Recent Searches on page1
function displayCityBtn() {
    
    for (var i = 0; i < storeCity.length; i++){
        var newBtn = $("<button>");
        newBtn.attr("type", "button");
        newBtn.attr("class", "list-group-item list-group-item-action cityBtn");
        newBtn.attr("data-cityName", storeCity[i]);
        newBtn.text(storeCity[i])

        $("#order").append(newBtn);
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
          console.log(`LENGTH OF DATA FROM TRAILSAPI FETCH:  ${data.results}`);
          coOrdinatesMarkerList.length = 0;
          coOrdinatesList.length = 0;
          var coOrdinatesPair = new Object();
          if (data.results > 5) {
            for (let i = 0; i < 5; i++) {
              var coOrdsLon = data.data[i].lon;
              var coOrdsLat = data.data[i].lat;
              // console.log(`ITERATION ${i} | LON:  ${coOrdsLon}`);
              // console.log(`ITERATION ${i} | LON:  ${coOrdsLat}`);
              coOrdinatesPair = { lat: coOrdsLat, lng: coOrdsLon };
              coOrdinatesMarker[0] = parseFloat(coOrdsLat);
              coOrdinatesMarker[1] = parseFloat(coOrdsLon);
              coOrdinatesList.push(coOrdinatesPair);
              coOrdinatesMarkerList.push(coOrdinatesMarker);
            } 
          } else if (data.results <= 5) {
            for (let i = 0; i < data.results; i++) {
              var coOrdsLon = data.data[i].lon;
              var coOrdsLat = data.data[i].lat;
              // console.log(`ITERATION ${i} | LON:  ${coOrdsLon}`);
              // console.log(`ITERATION ${i} | LON:  ${coOrdsLat}`);
              coOrdinatesPair = { lat: coOrdsLat, lng: coOrdsLon };
              coOrdinatesMarker[0] = parseFloat(coOrdsLat);
              coOrdinatesMarker[1] = parseFloat(coOrdsLon);
              coOrdinatesList.push(coOrdinatesPair);
              coOrdinatesMarkerList.push(coOrdinatesMarker);
            }
          } else {
            // modal here displaying "NO RESULTS FOUND"
            console.log(`NO RESULTS FOUND AT THIS LOCATION`);
          }
          console.log(`FINAL coOrdinatesList:  ${JSON.stringify(coOrdinatesList)}`)
          initMap(coOrdinatesCenter, coOrdinatesList);
          return coOrdinatesList
        })
      }
    })
    .catch((err) => {
      console.error(err);
    });

}
loadCity()







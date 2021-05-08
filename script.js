
//Current Weather function//
var date = moment().format("L");
var key = '957c1d427eb08dc32b2d83caeea47227'

function curWeather(locale) {
    var qUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locale}&units=imperial&appid=957c1d427eb08dc32b2d83caeea47227`;
     
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
                    
       
        $("#todayWeather").append(cityData);
    })

// //Current Weather function//
 //var date = moment().format("L");
 var key = '957c1d427eb08dc32b2d83caeea47227'

 function curWeather(locale) {
     var qUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locale}&units=imperial&appid=957c1d427eb08dc32b2d83caeea47227`;
     
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
                    
       

//        $("#weather").append(cityData);
//    })

    

};       


// WM's nonsense:

/*var john = document.querySelector('#john');
var order = document.querySelector('#order');
var userInput = document.querySelector('#userInput')
var mapDisplay = $('#map');


john.addEventListener('click', updateorder);

function updateorder (event) {
  if (john.value === 'click') {
    john.value = 'Start machine';
  } else {
    john.value = 'Start machine';
    order.textContent = 'userValue';
  }
}


//Add primary search (city) from page1 to local storage

var storeCity = [];

$("#john").on("click", function(event) {
    var userCity = $("#userInput").val();
    storeCity.push(userCity);
    localStorage.setItem("cities", JSON.stringify(storeCity))
    displayCityBtn();
});

//load saved cities from local storage
function loadCity() {
    var savedCity = localStorage.getItem("cities");
    if (loadCity) {
        city = JSON.parse(savedCity);
        city.reverse();
        
        curWeather(storeCity[0]);
    }

};

//displays saved recent searches as button in Recent Searches on page1
function displayCityBtn() {
    $("#order").empty();
    for (var i = 0; i < storeCity.length; i++){
        var newBtn = $("<button>");
        newBtn.attr("type", "button");
        newBtn.attr("class", "list-group-item list-group-item-action cityBtn");
        newBtn.attr("data-cityName", storeCity[i]);
        newBtn.text(storeCity[i])

        $("#order").append(newBtn);
    }
 
};



// MAP INTEGRATION
function initMap() {
    var somewhereNearMandale = { lat: 35.8268180464077, lng: -79.2584376142173 }
    //  ^^^ this can be any variable with an array of lat/long object values
    const map = new google.maps.Map(mapDisplay, {
      zoom: 12,
      center: somewhereNearMandale,
    });
    const marker = new google.maps.Marker({
      position: somewhereNearMandale,
      map: map,
    });
  };



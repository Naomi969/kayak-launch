
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
    
};       


// WM's nonsense:

var john = document.querySelector('#john');
var order = document.querySelector('#order');
var userInput = document.querySelector('#userInput')




john.addEventListener('click', updateorder);

function updateorder (event) {
  if (john.value === 'click') {
    john.value = 'Start machine';
    order.textContent = userValue;
  } else {
    john.value = 'Start machine';
    order.textContent = 'userInput';
  }
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button - machine is stopped indeed.

    

/// Darkmode button and Dingo picture background


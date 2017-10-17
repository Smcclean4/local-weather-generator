var API_KEY = "8db0b7c18d9d0a305632fb0b254965e9";
var cel = false;
var wd;

function displayTemp(fTemp, c) {
  if (c) return Math.round((fTemp - 32) * (5 / 9)) + " C";
  return Math.round(fTemp) + " F";
}

function render(wd, cel) {
  var currentLocation = wd.name;
  var currentWeather = wd.weather[0].description;
  var currentTemp = displayTemp(wd.main.temp, cel);
  var high = displayTemp(wd.main.temp_max, cel);
  var low = displayTemp(wd.main.temp_min, cel);
  var icon = wd.weather[0].icon;

  $(".location").html(currentLocation);
  $(".weather").html(currentWeather);
  $(".temp").html(currentTemp).addClass("tempView");
  $(".high-low").html(high + "/" + low).addClass("tempView");

  var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
  
  $(".weather").prepend('<img src="' + iconSrc + '"/>')

}

$(document).ready(function() {
  var loc;
var getWeather = "";
  $.getJSON('http://ipinfo.io', function(d) {
    console.log("assigning the data ...")
    loc = d.loc.split(",")
    console.log(loc)

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function(apiData) {
      wd = apiData

      render(apiData, cel)
      
       $("#weather-btn").click(function(){
      location.reload(true)
  })

      $("#togglecf").click(function() {

        cel = !cel;
        render(wd, cel)
        
      })
    })

  })
  
 

})
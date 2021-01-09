$(document).ready(function () {

weather();
nutritionix();
youtube();
bmiCalc();

  function weather(){
    var weatherKey = "003a409f77a14111e24eab0bc46c05ec";
  
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=" + weatherKey

    $.ajax({
      url: weatherURL,
      method: "GET"
    }).then(function(weatherAPi) {
      console.log(weatherAPi);
    });
  
  }


    function nutritionix(){
      var appKey = "64294de991310089661a16d9cd168ca1"
      var appId = "8e63a8a3"
      var query = "cookies" //$("#food").val();
      
      var queryURL = "https://api.nutritionix.com/v1_1/search/" +query+ "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=" + appId + "&appKey=" + appKey
      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        
        console.log(response);
      });
  
    }
  
   function youtube(){
    
     var youtubeKey = "AIzaSyDqKuO43bR2rpGY_lJE6QlWQ39tCXUBLqQ";
     var query = "how to run";
     var maxResults = "&maxResults=2"
     var type = "&type=videos"
  
        var queryURL = "https://www.googleapis.com/youtube/v3/videos?id=" +query+ "&key=" + youtubeKey +"&part=snippet" + maxResults
      
        $.ajax({
          url: queryURL,
          method: "GET"
       }).then(function(response) {
          console.log(response);
        });
       }
  
function bmiCalc(){

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://bmi.p.rapidapi.com/",
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "bmi.p.rapidapi.com",
      "x-rapidapi-key": "326c08efc4msh3ec74b227a66488p11e6a4jsn175985e6f982",
      "content-type": "application/json",
      "accept": "application/json"
    },
    "processData": false,
    "data": "{\"weight\":{\"value\":\"85.00\",\"unit\":\"kg\"},\"height\":{\"value\":\"170.00\",\"unit\":\"cm\"},\"sex\":\"m\",\"age\":\"24\",\"waist\":\"34.00\",\"hip\":\"40.00\"}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


}


  });
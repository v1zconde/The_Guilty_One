$(document).ready(function () {

  var height = 170;//$("#searchHeight").val();
  var weight = 108;//$("#searchweight").val();
  var age = 30;//$("#searchAge").val();
  var gender = "male";
// weather();
// nutritionix();
// youtube();
// exercise();
// bmi();
// dailyCalory();
// idealWeight();

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

  
   function youtube(){
    
     var youtubeKey = "AIzaSyDqKuO43bR2rpGY_lJE6QlWQ39tCXUBLqQ";
     var query = "how to run";
     var maxResults = "&maxResults=2"
     //var type = "&type=videos"
  
        var queryURL = "https://www.googleapis.com/youtube/v3/videos?id=" +query+ "&key=" + youtubeKey +"&part=snippet" + maxResults
      
        $.ajax({
          url: queryURL,
          method: "GET"
       }).then(function(response) {
          console.log(response);
        });
       }



       function nutritionix(){
 
        //var text = document.getElementById('inputlg').value;
        var foodCalorie = "1 slice of pizza" //$("#searchCalorie").val();
       // Ajax call to API and then appends the returned info to the food log. 
        $.ajax({
            url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
            headers: {
                "x-app-id": "8e63a8a3",
                "x-app-key": "64294de991310089661a16d9cd168ca1",
                "Content-Type": "application/json"
            },
            "type": "POST",
            "dataType": "json",
            "processData": false,
            data: JSON.stringify({"query": foodCalorie}),
            success: function(response) {
                console.log(response)
            }
        });
       
       }
       
       
       function exercise(){
        
         //var text = document.getElementById('inputlg').value;
         var varExercise = "run 3 miles" //$("#searchExercise").val();
        // Ajax call to API and then appends the returned info to the food log. 
         $.ajax({
             url: `https://trackapi.nutritionix.com/v2/natural/exercise`,
             headers: {
                 "x-app-id": "8e63a8a3",
                 "x-app-key": "64294de991310089661a16d9cd168ca1",
                 "Content-Type": "application/json"
             },
             "type": "POST",
             "dataType": "json",
             "processData": false,
             data: JSON.stringify({
               "query": varExercise,
               "gender": "male",
               "weight_kg": weight,
               "height_cm": height,
               "age": age      
             }),
             success: function(response) {
                 console.log(response);
             }
         });
        
        }
       
      //  $("#searchBtn").on("click", function(event){
      //    event.preventDefault();
      //    nutritionix();
      //    exercise();
      //    bmi();
      //  });
       
       
       
       function bmi(){
       
         var settings = {
           "async": true,
           "crossDomain": true,
           "url":  "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age+ "&height=" + height +"&weight="+ weight,
           "method": "GET",
           "headers": {
             "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
             "x-rapidapi-key": "326c08efc4msh3ec74b227a66488p11e6a4jsn175985e6f982"
           }
         }
         
         $.ajax(settings).done(function (response) {
           console.log(response);
         });
       }
       
       
function idealWeight(){
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://fitness-calculator.p.rapidapi.com/idealweight?weight="+ weight+"&gender=" + gender +"&height="+height,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
		"x-rapidapi-key": "326c08efc4msh3ec74b227a66488p11e6a4jsn175985e6f982"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
}

function dailyCalory(){

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fitness-calculator.p.rapidapi.com/dailycalory?heigth=" + height + "&age=" + age + "&gender=" + gender+ "&weigth=" + weight,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
      "x-rapidapi-key": "326c08efc4msh3ec74b227a66488p11e6a4jsn175985e6f982"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


}

})
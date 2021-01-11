$(document).ready(function () {
$(document).foundation();
  var height;//$("#searchHeight").val();
  var weight;//$("#searchweight").val()/2.20462;
  var age;//$("#searchAge").val();
  var gender;
  var bmiSection = $("#section-BMI");
  var listFood = $("#list-food");
  var nfCalories = 0;
  var sumCalories = 0;
// weather();
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



       function nutritionix(foodCalorie){
 
       
        
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
              console.log(response);
              console.log(response.foods[0].nf_calories);
              console.log(response.foods[0].nf_protein);
              console.log(response.foods[0].nf_cholesterol);
              console.log(response.foods[0].nf_dietary_fiber);
              console.log(response.foods[0].nf_total_carbohydrate);
              console.log(response.foods[0].nf_total_fat);
              console.log(response.foods[0].nf_saturated_fat);
              
              nfCalories = response.foods[0].nf_calories;
              sumCalories += response.foods[0].nf_calories;
              $("#caloric-intake").text("Caloric Intake: "+ sumCalories.toFixed(2))
              var newFood = $("<li>").text(foodCalorie).addClass("callout primary").data("data-calorie", nfCalories);
              var closeBtn = $("<button>").addClass("close-button").attr("aria-label", "Dismiss alert").attr("type", "button");
              var spanBtn = `<span aria-hidden="true">&times;</span>`;
              
              console.log(nfCalories);
              var divCal = $("<p>").text(response.foods[0].nf_calories + " cal");
            
              console.log(divCal);
              console.log(newFood);
              console.log(closeBtn);
              console.log(spanBtn);
            
              newFood.append(divCal);
              newFood.append(closeBtn);
              closeBtn.append(spanBtn);
              listFood.append(newFood);

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
               "gender": gender,
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
           var bmiNumber = $("<div>").text("BMI Number: " + parseInt(response.bmi));
           var bmiResult = $("<div>").text("Weight Status: " + response.health);
           var bmiHealthy = $("<div>").text("Healthy BMI Range:" + response.healthy_bmi_range);
          bmiSection.append(bmiNumber, bmiResult, bmiHealthy);
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
  var convertWeight = (response.Devine * 2.20462);
  var idealWeight = $("<div>").text("Ideal Weight: " + parseInt(convertWeight) + " Lbs");
  bmiSection.append(idealWeight);
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

$("#userinfo-btn").on("click", function(){

console.log("button");

height = $("#searchHeight").val();
weight = $("#searchweight").val()/2.20462;
age = $("#searchAge").val();
gender = $("#searchGender").val();

})

$("#meal-btn").on("click", function(){

  console.log("button");
  var foodCalorie = $("#searchCalorie").val();
  nutritionix(foodCalorie);

  

  })

$("#list-food").on("click", ".close-button", function(){

  sumCalories = sumCalories - $(this).parent().data("data-calorie");
  console.log(sumCalories);
  $("#caloric-intake").text("Caloric Intake: "+ sumCalories.toFixed(2));
  console.log($(this).parent());
  $(this).parent().remove();

})



})
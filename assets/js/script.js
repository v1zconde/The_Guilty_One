$(document).ready(function () {
  $(document).foundation();
    var height = 0;
    var weight = 0;
    var age = 0;
    var gender;
    var bmiSection = $("#section-BMI");
    var listFood = $("#list-food");
    var nutriFacts = $("#nutritional-facts");
    var sumCalories = 0;
    var nfProtein =0;
    var nfCholesterol =0;
    var nfDietaryFiber =0;
    var nfTotalCarbohydrate =0;
    var nfTotalFat =0;
    var nfSaturatedFat =0;
    var allValues = {};
    var caloriesTotal;
    var proteinTotal;
    var cholesterolTotal;
    var fiberTotal;
    var carbohydrateTotal;
    var fatTotal;
    var satFatTotal;
    
  
   
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
                var nfCalories = 0;
                var nfCholesterolSingle = 0;
                var nfDietaryFiberSingle = 0;
                var nfTotalCarbohydrateSingle = 0;
                var nfTotalFatSingle = 0;
                var nfSaturatedFatSingle = 0;
                var nfProteinSingle = 0;
  
                allValues = {};
                nutriFacts.empty();
                for (i = 0; i < response.foods.length; i++){
                
                nfCalories += response.foods[i].nf_calories;
                nfProtein += response.foods[i].nf_protein;
                nfCholesterol += response.foods[i].nf_cholesterol;
                nfDietaryFiber += response.foods[i].nf_dietary_fiber;
                nfTotalCarbohydrate += response.foods[i].nf_total_carbohydrate;
                nfTotalFat += response.foods[i].nf_total_fat;
                nfSaturatedFat += response.foods[i].nf_saturated_fat;
                nfProteinSingle += response.foods[i].nf_protein;
                nfCholesterolSingle += response.foods[i].nf_cholesterol;
                nfDietaryFiberSingle += response.foods[i].nf_dietary_fiber;
                nfTotalCarbohydrateSingle += response.foods[i].nf_total_carbohydrate;
                nfTotalFatSingle += response.foods[i].nf_total_fat;
                nfSaturatedFatSingle += response.foods[i].nf_saturated_fat;
                
                sumCalories += response.foods[i].nf_calories;
                }
                allValues = {
                  sumCalories: sumCalories,
                  protein: nfProtein,
                  cholesterol: nfCholesterol,
                  dietaryFiber: nfDietaryFiber,
                  carbohydrate: nfTotalCarbohydrate,
                  fat: nfTotalFat,
                  saturatedFat: nfSaturatedFat,
                  calories: nfCalories,
                  proteinSingle: nfProteinSingle,
                  cholesterolSingle: nfCholesterolSingle,
                  dietaryFiberSingle: nfDietaryFiberSingle,
                  carbohydrateSingle: nfTotalCarbohydrateSingle,
                  fatSingle: nfTotalFatSingle,
                  saturatedFatSingle: nfSaturatedFatSingle
              }
  
              $("#caloric-intake").text("Caloric Intake: "+ allValues.sumCalories.toFixed(2))
              var newFood = $("<li>").text(foodCalorie + " = " + allValues.calories.toFixed(2) + " cal").addClass("callout primary").data("data-calorie", allValues);
              var closeBtn = $("<button>").addClass("close-button").attr("aria-label", "Dismiss alert").attr("type", "button");
              var spanBtn = `<span aria-hidden="true">&times;</span>`;
  
              caloriesTotal = $("<li>").text("Calories: " + allValues.sumCalories.toFixed(2)).attr("id", "li-calories");
              proteinTotal = $("<li>").text("Proteins: " + allValues.protein.toFixed(2)).attr("id", "li-protein");
              cholesterolTotal = $("<li>").text("Cholesterol: " + allValues.cholesterol.toFixed(2)).attr("id", "li-cholesterol");
              fiberTotal = $("<li>").text("Dietary Fiber: " + allValues.dietaryFiber.toFixed(2)).attr("id", "li-fiber");
              carbohydrateTotal = $("<li>").text("Carbohydrate: " + allValues.carbohydrate.toFixed(2)).attr("id", "li-carbohydrate");
              fatTotal = $("<li>").text("Total Fat: " + allValues.fat.toFixed(2)).attr("id", "fat");
              satFatTotal = $("<li>").text("Saturated Fat: " + allValues.saturatedFat.toFixed(2)).attr("id", "li-saturatedfat");
  
  
              nutriFacts.append(caloriesTotal, proteinTotal, cholesterolTotal, carbohydrateTotal, fiberTotal, fatTotal, satFatTotal);
  
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
         
         
         
         function bmi(age, height, weight){
         
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
         
         
  function idealWeight(gender, height, weight){
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
  
  $("#userinfo-btn").on("click", function(event){
    event.preventDefault();
var heightFeet = $("#feet-input").val() * 12;
var heightInches = $("#inches-input").val();

  height = (parseInt(heightFeet) + parseInt(heightInches)) * 2.54;

  console.log(heightFeet);
  console.log(heightInches);
  console.log(height);
  weight = parseInt($("#weight-input").val())/2.20462;
  age = $("#age-input").val();
  gender = $('form input[type=radio]:checked').val();
  console.log(weight);

  bmi(age, height, weight);
  idealWeight(gender, height, weight)
  })
  
  $("#meal-btn").on("click", function(){
  
    console.log("button");
    var foodCalorie = $("#searchCalorie").val();
    nutritionix(foodCalorie);
  
  
  
    })
  
  $("#list-food").on("click", ".close-button", function(){
  
    allValues.sumCalories = allValues.sumCalories - $(this).parent().data("data-calorie").calories;
    allValues.protein = allValues.protein - $(this).parent().data("data-calorie").proteinSingle;
    allValues.cholesterol = allValues.cholesterol - $(this).parent().data("data-calorie").cholesterolSingle;
    allValues.dietaryFiber = allValues.dietaryFiber- $(this).parent().data("data-calorie").dietaryFiberSingle;
    allValues.carbohydrate =  allValues.carbohydrate - $(this).parent().data("data-calorie").carbohydrateSingle;
    allValues.fat = allValues.fat - $(this).parent().data("data-calorie").fatSingle;
    allValues.saturatedFat = allValues.saturatedFat - $(this).parent().data("data-calorie").saturatedFatSingle;
  
  
    console.log(allValues.sumCalories);
    console.log(allValues.calories);
    console.log()
    caloriesTotal.text("Calories: " + allValues.sumCalories.toFixed(2));
    proteinTotal.text("Proteins: " + allValues.protein.toFixed(2));
    cholesterolTotal.text("Cholesterol: " + allValues.cholesterol.toFixed(2));
    fiberTotal.text("Dietary Fiber: " + allValues.dietaryFiber.toFixed(2));
    carbohydrateTotal.text("Carbohydrate: " + allValues.carbohydrate.toFixed(2));
    fatTotal.text("Total Fat: " + allValues.fat.toFixed(2));
    satFatTotal.text("Saturated Fat: " + allValues.saturatedFat.toFixed(2));
  
   
    $("#caloric-intake").text("Caloric Intake: "+ allValues.sumCalories.toFixed(2));
    console.log($(this).parent());
    $(this).parent().remove();
    if (listFood.children().length === 0){
      console.log("no more items");
      nfCalories = 0 ;
      nfProtein = 0 ;
      nfCholesterol = 0 ;
      nfDietaryFiber = 0;
      nfTotalCarbohydrate = 0;
      nfTotalFat = 0;
      nfSaturatedFat = 0;
      sumCalories = 0;
      allValues = {};
    }
  })
  })
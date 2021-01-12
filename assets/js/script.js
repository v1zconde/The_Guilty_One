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
  var nfProtein = 0;
  var nfCholesterol = 0;
  var nfDietaryFiber = 0;
  var nfTotalCarbohydrate = 0;
  var nfTotalFat = 0;
  var nfSaturatedFat = 0;
  var allValues = {};
  var caloriesTotal;
  var proteinTotal;
  var cholesterolTotal;
  var fiberTotal;
  var carbohydrateTotal;
  var fatTotal;
  var satFatTotal;
  $(".flex-video").hide();
  $("#section-exercise").hide();
  mapboxgl.accessToken =
    "pk.eyJ1IjoidjF6Y29uZGUiLCJhIjoiY2tqdTMyZXRtMGJiaDMycGw5dGEyeXhpMCJ9.b_yBWiWPazINgTelgLeUjg";
  var lat;
  var lng;
  navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true,
  });

  // weather();
  // youtube();
  // exercise();
  // bmi();
  // dailyCalory();
  // idealWeight();

  init();

  var interval = setInterval(function () {
    var momentNow = moment();
    $("#time").html(
      momentNow.format("MMMM DD YYYY") + " " + momentNow.format("hh:mm:ss A")
    );
  }, 100);

  function init() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(weather);
      console.log(navigator.geolocation);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function weather(location) {
    var weatherKey = "0672c5c44771cae78024eb3855e55f10";

    var weatherURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      location.coords.latitude +
      "&units=imperial" +
      "&lon=" +
      location.coords.longitude +
      "&appid=" +
      weatherKey;

    $.ajax({
      url: weatherURL,
      method: "GET",
    }).then(function (weatherAPi) {
      console.log(weatherAPi);
    });
  }

  function youtube(query) {
    var youtubeKey = "AIzaSyDqKuO43bR2rpGY_lJE6QlWQ39tCXUBLqQ";
    console.log(query);
    //var type = "&type=videos"

    var queryURL =
      "https://www.googleapis.com/youtube/v3/search?part=id&q=" +
      query +
      "&type=video&videoEmbeddable=true&maxResults=2&key=" +
      youtubeKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#video-section").show();
      $("#video1").attr(
        "src",
        "https://www.youtube.com/embed/" + response.items[0].id.videoId
      );
      $("#video2").attr(
        "src",
        "https://www.youtube.com/embed/" + response.items[1].id.videoId
      );
    });
  }

  function nutritionix(foodCalorie) {
    // Ajax call to API and then appends the returned info to the food log.
    $.ajax({
      url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      headers: {
        "x-app-id": "263ad9b6",
        "x-app-key": "125ecacb1d54725e8b4bc6cdea6f0e53",
        "Content-Type": "application/json",
      },
      type: "POST",
      dataType: "json",
      processData: false,
      data: JSON.stringify({ query: foodCalorie }),
      success: function (response) {
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
        for (i = 0; i < response.foods.length; i++) {
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
          saturatedFatSingle: nfSaturatedFatSingle,
        };

        $("#caloric-intake").text(
          "Caloric Intake: " + allValues.sumCalories.toFixed(2)
        );
        var newFood = $("<li>")
          .text(foodCalorie + " = " + allValues.calories.toFixed(2) + " cal")
          .addClass("callout primary")
          .data("data-calorie", allValues);
        var closeBtn = $("<button>")
          .addClass("close-button")
          .attr("aria-label", "Dismiss alert")
          .attr("type", "button");
        var spanBtn = `<span aria-hidden="true">&times;</span>`;

        caloriesTotal = $("<li>")
          .text("Calories: " + allValues.sumCalories.toFixed(2))
          .attr("id", "li-calories");
        proteinTotal = $("<li>")
          .text("Proteins: " + allValues.protein.toFixed(2))
          .attr("id", "li-protein");
        cholesterolTotal = $("<li>")
          .text("Cholesterol: " + allValues.cholesterol.toFixed(2))
          .attr("id", "li-cholesterol");
        fiberTotal = $("<li>")
          .text("Dietary Fiber: " + allValues.dietaryFiber.toFixed(2))
          .attr("id", "li-fiber");
        carbohydrateTotal = $("<li>")
          .text("Carbohydrate: " + allValues.carbohydrate.toFixed(2))
          .attr("id", "li-carbohydrate");
        fatTotal = $("<li>")
          .text("Total Fat: " + allValues.fat.toFixed(2))
          .attr("id", "fat");
        satFatTotal = $("<li>")
          .text("Saturated Fat: " + allValues.saturatedFat.toFixed(2))
          .attr("id", "li-saturatedfat");

        nutriFacts.append(
          caloriesTotal,
          proteinTotal,
          cholesterolTotal,
          carbohydrateTotal,
          fiberTotal,
          fatTotal,
          satFatTotal
        );

        newFood.append(closeBtn);
        closeBtn.append(spanBtn);
        listFood.append(newFood);
      },
    });
  }

  function exercise(varExercise) {
    //var text = document.getElementById('inputlg').value;
    //$("#searchExercise").val();
    console.log(varExercise);
    query = "1 mile run 10 min swiming, 10 jumping jacks, 10 squads";
    // Ajax call to API and then appends the returned info to the food log.
    $.ajax({
      url: `https://trackapi.nutritionix.com/v2/natural/exercise`,
      headers: {
        "x-app-id": "263ad9b6",
        "x-app-key": "125ecacb1d54725e8b4bc6cdea6f0e53",
        "Content-Type": "application/json",
      },
      type: "POST",
      dataType: "json",
      processData: false,
      data: JSON.stringify({
        // query: varExercise,
        query: query,
        gender: gender,
        weight_kg: weight,
        height_cm: height,
        age: age,
      }),
      success: function (response) {
        console.log(response);
      },
    });
  }

  //  $("#searchBtn").on("click", function(event){
  //    event.preventDefault();
  //    nutritionix();
  //    exercise();
  //    bmi();
  //  });

  function bmi(age, height, weight) {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://fitness-calculator.p.rapidapi.com/bmi?age=" +
        age +
        "&height=" +
        height +
        "&weight=" +
        weight,
      method: "GET",
      headers: {
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        "x-rapidapi-key": "326c08efc4msh3ec74b227a66488p11e6a4jsn175985e6f982",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      var bmiNumber = $("<div>").text("BMI Number: " + parseInt(response.bmi));
      var bmiResult = $("<div>").text("Weight Status: " + response.health);
      var bmiHealthy = $("<div>").text(
        "Healthy BMI Range:" + response.healthy_bmi_range
      );
      var titleBmi = $("<h3>").text("User Results: ");
      var bmrWeight = $("#weight-input").val();
      var bmrHeight =
        parseInt($("#feet-input").val() * 12) +
        parseInt($("#inches-input").val());
      var bmrAge = $("#age-input").val();
      var calIntake = $("#calintake-list option:selected").val();
      var bmrTotal = 0;
      var bmrResult = 0;
      if (gender === "male") {
        bmrTotal = 66 + 6.3 * bmrWeight + 12.9 * bmrHeight - 6.8 * bmrAge;
        bmrResult = $("<div>").text(
          "Calorie Intake: " + bmrTotal * calIntake + " to maintain weight"
        );
      } else {
        bmrTotal = 655 + 4.3 * bmrWeight + 4.7 * bmrHeight - 4.7 * bmrAge;
        bmrResult = $("<div>").text(
          "Calorie Intake: " + bmrTotal * calIntake + " to maintain weight"
        );
      }

      bmiSection.empty();
      bmiSection.append(titleBmi, bmiNumber, bmiResult, bmiHealthy, bmrResult);
      idealWeight(gender, height, weight);
    });
  }

  function idealWeight(gender, height, weight) {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://fitness-calculator.p.rapidapi.com/idealweight?weight=" +
        weight +
        "&gender=" +
        gender +
        "&height=" +
        height,
      method: "GET",
      headers: {
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        "x-rapidapi-key": "326c08efc4msh3ec74b227a66488p11e6a4jsn175985e6f982",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      var convertWeight = response.Devine * 2.20462;
      var idealWeight = $("<div>").text(
        "Ideal Weight: " + parseInt(convertWeight) + " Lbs"
      );
      bmiSection.append(idealWeight);
    });
  }

  function dailyCalory() {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://fitness-calculator.p.rapidapi.com/dailycalory?heigth=" +
        height +
        "&age=" +
        age +
        "&gender=" +
        gender +
        "&weigth=" +
        weight,
      method: "GET",
      headers: {
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        "x-rapidapi-key": "326c08efc4msh3ec74b227a66488p11e6a4jsn175985e6f982",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  $("#userinfo-btn").on("click", function (event) {
    event.preventDefault();
    var heightFeet = $("#feet-input").val() * 12;
    var heightInches = $("#inches-input").val();

    height = (parseInt(heightFeet) + parseInt(heightInches)) * 2.54;

    console.log(heightFeet);
    console.log(heightInches);
    console.log(height);
    weight = parseInt($("#weight-input").val()) / 2.20462;
    age = $("#age-input").val();
    gender = $("form input[name=gender]:checked").val();
    console.log(gender);

    bmi(age, height, weight);
  });

  $("#meal-btn").on("click", function (event) {
    event.preventDefault();
    console.log("button");
    var foodCalorie = $("#searchCalorie").val();
    $("#section-exercise").show();
    nutritionix(foodCalorie);
  });

  $("#list-food").on("click", ".close-button", function (event) {
    event.preventDefault();
    allValues.sumCalories =
      allValues.sumCalories - $(this).parent().data("data-calorie").calories;
    allValues.protein =
      allValues.protein - $(this).parent().data("data-calorie").proteinSingle;
    allValues.cholesterol =
      allValues.cholesterol -
      $(this).parent().data("data-calorie").cholesterolSingle;
    allValues.dietaryFiber =
      allValues.dietaryFiber -
      $(this).parent().data("data-calorie").dietaryFiberSingle;
    allValues.carbohydrate =
      allValues.carbohydrate -
      $(this).parent().data("data-calorie").carbohydrateSingle;
    allValues.fat =
      allValues.fat - $(this).parent().data("data-calorie").fatSingle;
    allValues.saturatedFat =
      allValues.saturatedFat -
      $(this).parent().data("data-calorie").saturatedFatSingle;

    console.log(allValues.sumCalories);
    console.log(allValues.calories);
    console.log();
    caloriesTotal.text("Calories: " + allValues.sumCalories.toFixed(2));
    proteinTotal.text("Proteins: " + allValues.protein.toFixed(2));
    cholesterolTotal.text("Cholesterol: " + allValues.cholesterol.toFixed(2));
    fiberTotal.text("Dietary Fiber: " + allValues.dietaryFiber.toFixed(2));
    carbohydrateTotal.text(
      "Carbohydrate: " + allValues.carbohydrate.toFixed(2)
    );
    fatTotal.text("Total Fat: " + allValues.fat.toFixed(2));
    satFatTotal.text("Saturated Fat: " + allValues.saturatedFat.toFixed(2));

    $("#caloric-intake").text(
      "Caloric Intake: " + allValues.sumCalories.toFixed(2)
    );
    console.log($(this).parent());
    $(this).parent().remove();
    if (listFood.children().length === 0) {
      console.log("no more items");
      nfCalories = 0;
      nfProtein = 0;
      nfCholesterol = 0;
      nfDietaryFiber = 0;
      nfTotalCarbohydrate = 0;
      nfTotalFat = 0;
      nfSaturatedFat = 0;
      sumCalories = 0;
      allValues = {};
    }
  });

  $("input[type=radio]").change(function (event) {
    event.preventDefault();
    var optionYoutube;

    var choosenExercise = $(this).val();

    if (choosenExercise === "Walking") {
      choosenExercise = choosenExercise + " 10 minutes";
      optionYoutube = "how to walk";
    } else if (choosenExercise === "Jogging") {
      choosenExercise = choosenExercise + " 10 minutes";
      optionYoutube = "how to Jog";
    } else if (choosenExercise === "Running") {
      choosenExercise = choosenExercise + "1 mile";
      optionYoutube = "how to run";
    } else if (choosenExercise === "Swimming") {
      choosenExercise = choosenExercise + " 10 minutes";
      optionYoutube = "how to swim";
    } else if (choosenExercise === "Bicycling") {
      choosenExercise = choosenExercise + " 10 minutes";
      optionYoutube = "how to ride a bicycle";
    } else {
      choosenExercise = choosenExercise + " 10 minutes";
      optionYoutube = "how to jump rope";
    }
    console.log(choosenExercise);
    console.log(optionYoutube);
    // exercise(choosenExercise);
    // youtube(optionYoutube);
  });

  function successLocation(position) {
    console.log(position);
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    setupMap([lng, lat]);
  }

  function errorLocation() {
    setupMap([-81.379234, 28.538336]); // add geo for orlando when they say no (right now is london)
  }

  function setupMap(center) {
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 12,
    });

    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    var marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }
});

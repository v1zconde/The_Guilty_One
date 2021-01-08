$(document).ready(function () {

weather();
nutritionix();
youtube();

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
      
    YOUR_API_KEY
  
       var queryURL = "https://www.googleapis.com/youtube/v3/videos?id=" +query+ "&key=" + youtubeKey +"&part=" + snippet,contentDetails,statistics,status
      
       $.ajax({
         url: queryURL,
         method: "GET"
       }).then(function(response) {
         
         console.log(response);
       });
      }





  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "maxResults": 2,
      "q": "how to run",
      "type": [
        "videos"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });

// <button onclick="authenticate().then(loadClient)">authorize and load</button>
// <button onclick="execute()">execute</button>





  });
    var searchKey = "LzVKbVcvXGbZGv50rz7l8WwBMqFGcT50"
  
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=" + searchKey

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);
    });
  

    var appKey = "64294de991310089661a16d9cd168ca1"
    var appId = "8e63a8a3"
    var query = "Cookies"
    
    var queryURL = "https://api.nutritionix.com/v1_1/search/" +query+ "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=" + appId + "&appKey=" + appKey
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);
    });


    var youtubeKey = "AIzaSyDqKuO43bR2rpGY_lJE6QlWQ39tCXUBLqQ";
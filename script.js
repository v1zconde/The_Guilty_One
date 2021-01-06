    var searchKey = "LzVKbVcvXGbZGv50rz7l8WwBMqFGcT50"
  
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=" + searchKey

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);
    });
  


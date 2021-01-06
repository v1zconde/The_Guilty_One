//this going to be the input query
var person = "&q=Bush";
//key from new york times apis
var key = "SysAOotjEWz4AyqKGmQY7SPAjF7d0eq0";
// this going ot be for the start year
var startYear = "&begin_date=19900101"
//this going to be for the end year
var endYear = "&end_date=20000101"


var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=" +
        key + person + startYear + endYear;

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {

      console.log(response);
    

        })


        testing ajax
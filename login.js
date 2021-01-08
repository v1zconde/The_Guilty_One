$(document).ready(function () {

    var userNameSavedString = localStorage.getItem("userNameSaved");
    var userNameSaved = JSON.parse(userNameSavedString);
    if (userNameSaved == null) {
        userNameSaved = {};
      }

    $("#submitBtn").on("click", function(event) {
        event.preventDefault();
        $("#msgError").text("");
        var userName = $("#userInput")
          .val()
          .trim()
          .toLowerCase();
      
          var userPass = $("#passInput")
          .val()
          .trim()
          .toLowerCase();
      
        if (userName != "" && userPass != "") {
          //Check to see if there is any text entered
          
            comparison(userName, userPass, userNameSaved);

        }
        else{
        $("#msgError").text("UserName or Password cant be empty");
        }   
});

function comparison(userName, userPass){
    console.log(userName +" "+ userPass + " " + userNameSaved[userName]);
    
    var keys = Object.keys(userNameSaved)
    if (keys.indexOf(userName) > -1) {
        console.log("user already");
        if (userPass == userNameSaved[userName]){
            console.log("im here");
            alert("you pass");
        }
        else{
            console.log("wrong pass");
        }
     }
     else{
        userNameSaved[userName] = userPass;
        localStorage.setItem("userNameSaved", JSON.stringify(userNameSaved));
        console.log("new user login successfull")
     }
    


}



});
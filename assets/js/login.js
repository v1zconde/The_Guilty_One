$(document).ready(function () {
//global variables and getting values from local storage
    var userNameSavedString = localStorage.getItem("userNameSaved");
    var userNameSaved = JSON.parse(userNameSavedString);
    if (userNameSaved == null) {
        userNameSaved = {};
      }
//submit button
    $("#signup-btn").on("click", function(event) {
        event.preventDefault();
        $("#msgError").text("");
        var userName = $("#name-input")
          .val()
          .trim()
          .toLowerCase();
      
          var userEmail = $("#email-input")
          .val()
          .trim()
          .toLowerCase();
      
          var userPass = $("#pass-input")
          .val()
          .trim()
          .toLowerCase();

        if (userName != "" && userPass != "" && userEmail != "") {
          //Check to see if there is any text entered
          
            comparison(userEmail, userPass, userName,userNameSaved);

        }
        else{
        $("#msgError").text("UserName or Password cant be empty");
        }   
});

function comparison(userEmail, userPass, userName){
    console.log(userEmail +" "+ userPass + " "+ userName + " " + userNameSaved[userEmail]);
    //get all the usernames to check if it already exist
    var keys = Object.keys(userNameSaved)
    console.log(keys);
    if (keys.indexOf(userEmail) > -1) {
        console.log("user already");
        //if the user is already in local storage
        if (userPass == userNameSaved[userEmail].pass){
            console.log("im here");
            alert("you pass");
        }
        else{
            console.log("wrong pass");
        }
     }
     else{
        userNameSaved[userEmail] = {pass: userPass,
                                    name: userName
                                    };
        localStorage.setItem("userNameSaved", JSON.stringify(userNameSaved));
        console.log("new user login successfull")
     }
}

});
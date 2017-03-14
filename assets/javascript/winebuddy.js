  $(document).ready(function(){
  // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDkYT0szsogfH1E33uVYgKug3IIAjvw6r0",
    authDomain: "wine-buddy-ef93b.firebaseapp.com",
    databaseURL: "https://wine-buddy-ef93b.firebaseio.com",
    storageBucket: "wine-buddy-ef93b.appspot.com",
    messagingSenderId: "1034780569"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var name;
var email;
var location;
var wineColor =[];

$("#submitWineButton").on("click", function(event) {
	event.preventDefault();
	name = $("#userName").val().trim();
	email = $("#userEmail").val().trim();
	location = $("#userLocation").val().trim();
	wineColor = $("input:checked").map(function(){
		return $(this).val();
	}).get();

	database.ref().update({
			name: name,
			email: email,
			location: location,
			wineColor: wineColor
		});
	});

});
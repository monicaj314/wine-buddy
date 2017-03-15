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

//setting up database 

var database = firebase.database();
var name;
var email;
var location;
var winePreference =[];
var categoryFilter = [];

function submitWineType() {
	name = $("#userName").val().trim();
	email = $("#userEmail").val().trim();
	location = $("#userLocation").val().trim();
	winePreference = $("input:checked").map(function(){
		return $(this).val();
	}).get();

	database.ref().push({
			name: name,
			email: email,
			location: location,
			winePreference: winePreference
		});
	};



//setting up ajax call

function checkForMultipleWines() {
	if (winePreference.length > 1) {
		for (var i = 0; i < winePreference.length; i++) {
		categoryFilter.push('categories(' + winePreference[i] + ')');
		}
		categoryFilter = categoryFilter.join('+');
	} else categoryFilter = ['categories(' + winePreference[0] + ')']
}

function getWineRecommendations() {
	checkForMultipleWines();
	var queryURL = 'https://services.wine.com/api/beta2/service.svc/json/catalog?filter=' + categoryFilter + '&size=10&sortBy=rating|descending+price|ascending&apikey=0bab0e3079cc594e3fdd6f1c925ce5f1'

	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	var results = response.Products.List;
    for (var i = 0; i < results.length; i++) {
    	var wineName = results[i].Name;
    	var wineList = $('#wine-list-results')
    	wineList.append("<li>" + wineName + "</li>")

    }

	});
}

$("#submitWineButton").on("click", function(event) {
	event.preventDefault();
	$('#wine-list-results').empty();
	submitWineType();
	getWineRecommendations();
	});
});
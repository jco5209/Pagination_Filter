//Tasks

	// insure bare bones funcationality without javascript

	// 'unobtrusive javascript'

	// display 10 students at a time

	// depending on total number of students, dynamically generate appropiate amount of page links

	// on page click, display next appropiate listings

	// use 'progressive enhancement' to add the search HTML
		// this should mean simply inject the HTML with javascript
		// since those without javascript cannot use it, they wont see it either

	// implement search funcationality to filter users
		// perhaps HTML element filtering
		// such as an h3's innerHTML/text storage

	// searchable by both name and email
		// also partial input search/filter

	// 'pagination' functionality with search results if results exceed 10

	// * animations on page load

	// * as user types, dynamically display results 
		// perhaps an on keypress event

	// * if no matches are found produce an HTML error message

//To Do Next:

// //store all students

// //generate buttons based on calculation



// display 10 students at a time
	// .children() creates an array
	// 
















$(".student-item").hide();
$(".page").append('<div id="studentPages"></div>');

var tenStudents;
var studentLength = $(".student-item").length;
var pageAmount = Math.ceil(studentLength / 10);

// generate buttons based on student amount Math.ceil
// unobtrusivley 
for(var i = 1; i <= pageAmount; i++) {
	$("#studentPages").append("<button>" + i + "</button>");
}

// on page click hide current listings
// store the index number of button that was clicked
// using tenStudents value with 'i' iteration, show corrosponding listings
/* 
	this must adapt with search functionality -
	currently the function takes in a single array - 
	the for loop must take in an argument - 
	should be possible with modification and a default fallback -
	or another 'undefined' possibility -
	also undefineds must be handled correctly -
*/ 
$("#studentPages button").click(function() {

	$(".student-item").hide();

	tenStudents = $("#studentPages button").index(this);

	for(var i = 0; i < 10; i++) {
		$(".student-item:eq(" + tenStudents + i + ")").show();
	}

})











































// end
/* global $ */

/* 
	generate search & pagination HTML interface 
*/
$(".page-header").append(
	'<div class="student-search">' +
		'<input placeholder="Search for Students...">' +
		'<button>Search</button>' +
	'</div>'
);
$(".page").append('<div class="pagination"><ul></ul></div>');


/* 
	pageAmount calculates needed pages based on number of students / 10 -
	'for loop' generates page HTML based on pageAmount value 
*/
function paginationAmount(x) {

	$(".pagination ul").html("");

	 var pageAmount = Math.ceil(x / 10);

	for(var i = 1; i <= pageAmount; i++) {

		if(i == 1) {
			$(".pagination ul").append("<li><a class='active' href='#'>" + i + "</a></li>");
		}
		else {
			$(".pagination ul").append("<li><a href='#'>" + i + "</a></li>");
		}
	}
}


/*
	currentPage stores the indice value of the currently selected page -
	concat currentPage value and current 'i' iteration to select appropiate students -
	loop breaks if no more students are available
*/
function displayResults() {

	var currentPage = $(".pagination a").index($(".active"));

	for(var i = 0; i < 10; i++) {

		if(searchResults[parseInt("" + currentPage + i)] === undefined) {
			break;
		}
		else {
			searchResults[parseInt("" + currentPage + i)].show();
		}
	}
}


/* 
	stores student search field input as a new Regular Expression -
	empty previous searchResults array -
	loops through all students to search for any matching results based on the inputted value -
	if a match is true for either student h3 field or email field, push into searchResults array -
	length of searchResults is passed to paginationAmount() to calculate # of pages to generate -
	if no results are found display 'No Matches Found...' message
*/
var searchResults = [];	

function searchStudent() {

	$(".student-item").hide();

	var searchVal = new RegExp($(".student-search input").val());
	
	searchResults = [];

	for(var i = 0; i < $(".student-item").length; i++) {

		if(searchVal.test($(".student-details:eq(" + i + ") h3").text()) === true || searchVal.test($(".student-details:eq(" + i + ") span").text()) === true) {
			searchResults.push($(".student-item:eq(" + i + ")"));
		}

	}

	paginationAmount(searchResults.length);

	if(searchResults.length === 0) {
		$(".page .no-results").remove();
		$(".page").append("<p class='no-results'>No Matches Found...</p>");
	} else {
		$(".page .no-results").remove();
		displayResults();
	}
}


// search for & display all students on page load
searchStudent();

$(".student-search input").keydown(function() {
	searchStudent();
});

$(".student-search button").click(function() {
	searchStudent();
});


/*
	on pagination anchor click, remove previous anchor class that has class of '.active' -
	addClass of '.active' to anchor that was clicked -
	hide previously displayed students -
	add a loading animation while displayResults is queued to fire
*/
$(".pagination").on("click", "a", function() {
	$(".pagination a").removeClass('active');
	$(this).addClass('active');
	$(".student-item").hide();
	$(".pagination").prepend("<div class='load-block0'></div> <div class='load-block1'></div> <div class='load-block2'></div>");
	setTimeout(function() { displayResults(); $(".pagination div").remove(); }, 750);
});




































// end
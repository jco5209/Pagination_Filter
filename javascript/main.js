//To Do Next:

// change button to anchor w/ parent div & ul/li's w/ appropiate classes & active marker



/* 
	hide all students except for the first 10 -
	generate search HTML & append to the .page-header -

*/
//$(".student-item:nth-of-type(n+11)").hide();
$(".page-header").append(
	'<div class="student-search">' +
		'<input placeholder="Search for Students...">' +
		'<button>Search</button>' +
	'</div>'
);
$(".page").append('<div id="student-pages"></div>');



/* 
	pageAmount calculates needed pages based on number of students / 10 -
	'for loop' generates page HTML based on pageAmount value -
*/
var pageAmount,
	tenStudents;

function paginationAmount(x) {

	$("#student-pages").html("");

	pageAmount = Math.ceil(x / 10);

	for(var i = 1; i <= pageAmount; i++) {
		$("#student-pages").append("<button>" + i + "</button>");
	}

}

function displayResults(x) {
	for(var i = 0; i < 10; i++) {
		x[10+i].show();
	}
}

function searchStudent() {

	$(".student-item").hide();

	var searchVal = new RegExp($(".student-search input").val());
	var resultsArr = [];

	for(var i = 0; i < $(".student-item").length; i++) {

		if(searchVal.test($(".student-item:eq(" + i + ") h3").text()) == true) {
			resultsArr.push($(".student-item:eq(" + i + ")"));
		}

	}

	paginationAmount(resultsArr.length);
	displayResults(resultsArr);
}



searchStudent();

$(".student-search input").keypress(function() {
	searchStudent();
});


$("#student-pages button").click(function() {


});



$(".student-search button").click(function() {
	searchStudent();
});




































// end
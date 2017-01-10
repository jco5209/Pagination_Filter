(function(){
	/* global $ */

	var searchResults = [];	

	// Generate search & pagination HTML interface
	$(".page-header").append(
		'<div class="student-search">' +
			'<input placeholder="Search for Students...">' +
			'<button>Search</button>' +
		'</div>'
	);
	$(".page").append('<div class="pagination"><ul></ul></div>');


	// Calculates needed pages
	function paginationAmount(x) {

		// Clear out pagination 
		$(".pagination ul").html("");

		// Divide students by 10
		var pageAmount = Math.ceil(x / 10);

		// Generate pagination HTML
		for(var i = 1; i <= pageAmount; i++) {

			if(i == 1) {
				$(".pagination ul").append("<li><a class='active' href='#'>" + i + "</a></li>");
			}
			else {
				$(".pagination ul").append("<li><a href='#'>" + i + "</a></li>");
			}
		}
	}


	// Display searched results
	function displayResults() {

		// Get currently active page
		var currentPage = $(".pagination a").index($(".active"));

		// Display students
		for(var i = 0; i < 10; i++) {

			// Break if all students have been iterated
			if(searchResults[parseInt("" + currentPage + i)] === undefined) {
				break;
			}
			else {
				searchResults[parseInt("" + currentPage + i)].show();
			}
		}
	}


	// Searches through students based on text input
	function searchStudent() {

		// Hide students when a new search begins
		$(".student-item").hide();

		// RegEx constructor to elvaluate text input for student matches
		var searchVal = new RegExp($(".student-search input").val());
		
		// Clear searchResults array
		searchResults = [];

		for(var i = 0; i < $(".student-item").length; i++) {

			// If any student(s) HTML matches searchVal, push student(s) to searchResults
			if(searchVal.test($(".student-details:eq(" + i + ") h3").text()) === true || searchVal.test($(".student-details:eq(" + i + ") span").text()) === true) {
				searchResults.push($(".student-item:eq(" + i + ")"));
			}

		}

		// Create new pagination based on amount of matching results
		paginationAmount(searchResults.length);

		// If no matches were found
		if(searchResults.length === 0) {
			$(".page .no-results").remove();
			$(".page").append("<p class='no-results'>No Matches Found...</p>");
		} else {
			$(".page .no-results").remove();
			displayResults();
		}
	}


	// Search for & display all students on page load
	searchStudent();

	$(".student-search input").keydown(function() {
		searchStudent();
	});

	$(".student-search button").click(function() {
		searchStudent();
	});


	// Page(s) click event listener
	$(".pagination").on("click", "a", function() {

		// Remove & Apply 'active' class
		$(".pagination a").removeClass('active');
		$(this).addClass('active');

		// Hide previous page's results
		$(".student-item").hide();

		// Page load animation
		$(".pagination").prepend("<div class='load-block0'></div> <div class='load-block1'></div> <div class='load-block2'></div>");
		setTimeout(function() { displayResults(); $(".pagination div").remove(); }, 750);
	});

})()
	
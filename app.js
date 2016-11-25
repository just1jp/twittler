$(document).ready(function(){

	users.push(visitor);
	streams.users[visitor] = [];
		
	var $feed = $('.feed');
	var $userPosts = $('.user-posts');
	var posts = streams.home;
	var postCountCurrent = streams.home.length;
	var postsPulled = 0;
	var quePosts = 0;


	// Que new tweets to page
	window.setInterval(function(){
		postCountCurrent = streams.home.length;
		var newPosts = postCountCurrent - postsPulled;
		
		if (newPosts > 0) {
			$('.more-posts').html('<a href="#" class="pink bold">View ' + newPosts + ' new posts</a>')
		}

	}, 1000);

	// Load initial tweets to page
	for (var i = 0; i < posts.length; i++) {
		$feed.prepend('<li><div class="row mb5"><div class="col-xs-6"><div class="post-user"><a href="#" class="bold" data-user="' + posts[i].user + '">@' + posts[i].user + '</a></div></div><div class="col-xs-6"><div class="post-time text-right"><p id="timestamp" class="pink bold">' + posts[i].created_at + '</p></div></div></div><div class="row"><div class="col-xs-12"><div class="post-text"><p>' + posts[i].message + '</p></div></div></div></li>');
		postsPulled++;
	}

	// Add new tweets to page
	$('.more-posts').on('click', 'a', function(event) {
		event.preventDefault();
		newPosts = 0;
		$('.more-posts').html('');
		for (var j = postsPulled; j < posts.length; j++) {
			$feed.prepend('<li><div class="row mb5"><div class="col-xs-6"><div class="post-user"><a href="#" class="bold" data-user="' + posts[j].user + '">@' + posts[j].user + '</a></div></div><div class="col-xs-6"><div class="post-time text-right"><p id="timestamp" class="pink bold">' + posts[j].created_at + '</p></div></div></div><div class="row"><div class="col-xs-12"><div class="post-text"><p>' + posts[j].message + '</p></div></div></div></li>');
			postsPulled++;
		}
	});

	// Add post
	$('#postForm').submit(function(event) {
		var postText = $('#postText').val();
		writeTweet(postText);
		event.preventDefault();
		$(this).find("input[type=text]").val("");
	});

	// Click home button
	$('#return-home').on('click', function(event) {
		event.preventDefault();
		$feed.toggle();
	});
	
	
	// Switch to user view
	$('.post-user').on('click', 'a', function(event) {
		event.preventDefault();
		var filteredUser = $(this).data('user');
		console.log(filteredUser);
		var filteredPosts = [];
		$feed.toggle();
		$userPosts.html('');

		for (var m=0; m < posts.length; m++) {
			if (posts[m].user === filteredUser) {
				filteredPosts.push(posts[m])
			}
		}

		for (var n = 0; n < filteredPosts.length; n++) {
			$userPosts.prepend('<li><div class="row mb5"><div class="col-xs-6"><div class="post-user"><a href="#" class="bold" data-user="' + filteredPosts[n].user + '">@' + filteredPosts[n].user + '</a></div></div><div class="col-xs-6"><div class="post-time text-right"><p id="timestamp" class="pink bold">' + filteredPosts[n].created_at + '</p></div></div></div><div class="row"><div class="col-xs-12"><div class="post-text"><p>' + filteredPosts[n].message + '</p></div></div></div></li>');
		}

	});














});
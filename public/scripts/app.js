/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 //Calculates and returns the elapsed time since the tweet was posted.
const elapsed = function(date) {
  //Get the elapsed time in seconds
  const elapsedSeconds = (new Date() - date) / 1000;
  if (elapsedSeconds < 60) {
    return Math.round(elapsedSeconds) + " seconds";
  } else if (elapsedSeconds / 60 < 60) {
    return Math.round(elapsedSeconds / 60) + " minutes";
  } else if (elapsedSeconds / 3600 < 24) {
    return Math.round(elapsedSeconds / 3600) + " hours";
  } else {
    return Math.round(elapsedSeconds / 86400) + " days";
  }
};

//Used to sanitize user input
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//Creates a tweet element that can then later be prepended to the tweets-container section
const createTweetElement = function(data) {
  let tweet = `
  <article>
    <header>
      <div class="avatar-and-name">
        <img src="${data.user.avatars}">
        <span class="name">
          ${data.user.name}
        </span>
      </div>
    <span class="handle">
      ${data.user.handle}
    </span>
    </header>
    <span class="tweet-body">
      ${escape(data.content.text)}
    </span>
    <footer>
      <span>
        ${elapsed(data.created_at)} ago
      </span>
      <span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article> `;

  return tweet;
};

//Creates and then prepends tweets to the tweets-container section
const renderTweets = function(data) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let result = ``;
  for (const tweetData of data) {
    $("#tweets-container").prepend(createTweetElement(tweetData));
  }
  return result;
};

//Loads initial tweets and sets up event handlers to respond to user input
$(document).ready(function() {
  const loadtweets = function() {
    $.get("/tweets/").then(function(data) {
      renderTweets(data);
    })
    .fail(function() {
      alert( "An error occurred while fetching tweets.");
    });
  };
  
  loadtweets();

  //Top left button click handler
  $(".nav-write-new").on("click", function() {
    if ($(".new-tweet").is(":hidden")){
      $(".new-tweet").slideDown('fast');
      $("#tweetText").focus();
    } else {
      $(".new-tweet").slideUp('fast');
      $("#tweetText").blur();
    }
  });

  //New tweet submission handler
  $("#new-tweet-form").on("submit", function() {
    event.preventDefault();

    const tweetText = $("#tweetText").val();
    const action = $("#new-tweet-form").attr("action");

    if (tweetText.length > 140) {
      $(".tweet-error").text("Character limit exceeded!");
      $(".tweet-error").slideDown('fast');
    } else if (tweetText === "") {
      $(".tweet-error").text("Your tweet is empty!");
      $(".tweet-error").slideDown('fast');
    } else {
      $.post(action, $(this).serialize()).then(function() {
        $(".tweet-error").text("");
        $(".tweet-error").slideUp('slow');
        $("#tweetText").val("");
        $.get("/tweets/").then(function(data) {
          renderTweets(data.splice(data.length-1));
        })
        .fail( function() {
          alert( "An error occurred while fetching tweets.");
          console.log(error.status + " " + error.statusText);
        });
      })
      .fail(function() {
        alert( "An error occurred while posting a tweet.");
      });
    }
  });
});

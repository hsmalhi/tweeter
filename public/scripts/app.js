/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const elapsed = function(date) {
  //Get the elapsed time in seconds
  const elapsedSeconds = (new Date() - date) / 1000;
  if (elapsedSeconds < 60) {
    return Math.round(elapsedSeconds) + " seconds";
  } else if (elapsedSeconds / 60 < 60) {
    return Math.round(elapsedSeconds / 60) + " minutes";
  } else if (elapsedSeconds / 3600 < 60) {
    return Math.round(elapsedSeconds / 3600) + " hours";
  } else {
    return Math.round(elapsedSeconds / 86400) + " days";
  }
};

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
      ${data.content.text}
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

const renderTweets = function(data) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let result = ``;
  for (const tweetData of data) {
    $("#tweets-container").append(createTweetElement(tweetData));
  }
  return result;
};

// Test / driver code (temporary)
$(document).ready(function() {
  const loadtweets = function() {
    $.get("/tweets/").then(function(data) {
      console.log("Successful AJAX GET call made!");
      renderTweets(data);
    });
  };
  
  loadtweets();

  $("#new-tweet-form").on("submit", function() {
    event.preventDefault();

    const tweetText = $("#tweetText").val();
    const action = $("#new-tweet-form").attr("action");

    if (tweetText.length > 140) {
      alert("Your tweet exceeds the character limit");
    } else if (tweetText === "") {
      alert("Your tweet is empty");
    } else {
      $.post(action, $(this).serialize()).then(function() {
        console.log("Successful AJAX POST call made");
        $("#tweetText").val("");
      });
    };
  });
});

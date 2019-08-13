/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const elapsed = function(date){
  //Get the elapsed time in seconds
  const elapsedSeconds = ((new Date()) - date)/1000;
  if (elapsedSeconds < 60) {
    return Math.round(elapsedSeconds) + " seconds"
  } else if (elapsedSeconds / 60 < 60) {
    return Math.round(elapsedSeconds/60) + " minutes"
  } else if ((elapsedSeconds / 3600 < 60)) {
    return Math.round(elapsedSeconds / 3600) + " hours"
  } else {
    return Math.round(elapsedSeconds / 86400) + " days"
  }
}

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

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let result = ``;
  for (const tweetData of data) {
    $('#tweets-container').append(createTweetElement(tweetData));
  }
  return result
}

// Test / driver code (temporary)
$(document).ready(function() {
  renderTweets(data);
});
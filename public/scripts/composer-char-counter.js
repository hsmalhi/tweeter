$(document).ready(function() {
  
  //Event handler which manages the changing of the character counter
  $("#new-tweet-text").on("keyup", function() {
    let tweetLength = $(this).val().length;
    $(this).siblings(".counter")[0].innerHTML = 140 - tweetLength;
  });
});
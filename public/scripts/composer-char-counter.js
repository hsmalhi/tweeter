$(document).ready(function() {
  
  //Event handler which manages the changing of the character counter
  $("textarea[name=text]").on("keyup", function() {
    let tweetLength = $(this).val().length;
    let counter = $(this).siblings(".counter")[0];
    counter.innerHTML = 140 - tweetLength;
    if(counter.innerHTML >= 0) {
      counter.className = "counter valid";
    } else {
      counter.className = "counter invalid";
    }
  });
});
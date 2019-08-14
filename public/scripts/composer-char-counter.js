$(document).ready(function() {
  
  //Event handler which manages the changing of the character counter
  $("textarea[name=text]").on("keyup", function() {
    const tweetLength = $(this).val().length;
    const $counter = $(this).siblings(".counter");
    const charsRemaining = 140 - tweetLength;
    $counter.text(charsRemaining);
    if (charsRemaining >= 0) {
      $counter.removeClass("invalid");
    } else {
      $counter.addClass("invalid");
    }
  });
});

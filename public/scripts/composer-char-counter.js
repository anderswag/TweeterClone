$(document).ready(function() {
  function characterCount() {
    var count = $(this).val().length;
    var counterElement = $(this).siblings('.counter').html(140 - count);
    if(count > 140) {
      $(counterElement).addClass("over-limit");
    } else {
      $(counterElement).removeClass("over-limit");
    }
  }
  //Listens to input of tweet
  $(".input-tweet").on("input", characterCount);
});


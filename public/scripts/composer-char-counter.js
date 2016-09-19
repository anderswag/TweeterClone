$(document).ready(function(){

  function characterCount(){
    var counterElement = $(this).siblings('.counter');
    var count = $(this).val().length;
    if(count > 140) {
      var overCount = 140 - count;
      $(counterElement).html(overCount).css("color","red");
    }
      $(counterElement).html(140 - count).css("color","black");
  }

  $(".input-tweet").keyup(characterCount);
});
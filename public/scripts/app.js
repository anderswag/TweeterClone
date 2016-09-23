/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function loadTweets() {
    $.get("/tweets", function(data){
      success: renderTweets(data)
    });
  }
  // Takes JSON data and calls the function to generate HTML
  function renderTweets(tweets) {
    $('#outer-tweet-container').empty();
    tweets.forEach(function(item) {
      $("#outer-tweet-container").append(createTweetElement(item));
    });
  }
  // Generate HTML of tweet from JSON data
  function createTweetElement(tweet) {
    var tweetUsername = tweet.user.name;
    var avatars = tweet.user.avatars.regular;
    var handle = tweet.user.handle;
    var tweetContent = tweet.content.text;
    var dateTweeted = tweet.created_at;
    var today = Date.now();
    var daysAgo = Math.floor((today - dateTweeted)/86400000);
    var tweetTemplate =`
                <section class = "tweet-container">
                  <header>
                    <img src="${avatars}">
                    <a>${tweetUsername}</a>
                    <p>${handle}</p>
                  </header>
                  <div class = "tweet-body">${tweetContent}</div>
                  <footer>
                    <div class="timestamp">
                      ${daysAgo} days ago
                    </div>
                    <div class ="social-buttons">
                      <i class="fa fa-flag" aria-hidden="true"></i>
                      <i class="fa fa-retweet" aria-hidden="true"></i>
                      <i class="fa fa-heart" aria-hidden="true"></i>
                    </div>
                  </footer>
                </section>
                `
    return tweetTemplate;
  }


  function validate(event) {
    event.preventDefault();
    var count = $(this).children("textarea").val().length;
    var tweetBody = $(this).children("textarea").serialize();
    if(count <= 0 || tweetBody === null){
      alert('Please write something');
    } else if(count >140) {
      alert('Exceeds limit of 140 characters');
    } else {
      $(this).children("textarea").val('');
      $(".counter").text("140");
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: tweetBody,
        success: loadTweets
      });
    }
  }

  $("#toggle-compose").click(function(){
    $("#toggle-compose").toggleClass("toggle-active");
    $(".new-tweet").slideToggle("fast");
    $(".new-tweet textarea").focus();
  });

  $(".new-tweet form").on("submit", validate);

  $("#outer-tweet-container").on("click",".tweet-container", function() {
    alert('tweet tweet');
  });

  loadTweets();
});
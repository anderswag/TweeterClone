/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
'use strict';

$(document).ready(function() {

  function renderTweets(tweets) {
    data.forEach(function(item, index) {
      $(".container").append(createTweetElement(item));
    });
  }

  function createTweetElement(tweet) {
    let tweetUsername = tweet.user.name;
    let avatars = tweet.user.avatars.regular;
    let handle = tweet.user.handle;
    let tweetContent = tweet.content.text;
    let dateTweeted = tweet.created_at;
    let today = Date.now();
    let daysAgo = Math.floor((today - dateTweeted)/86400000);
    let tweetTemplate =`
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
  renderTweets(data);
});
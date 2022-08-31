var bearer_token = "YOUR TWITTER API BEARER TOKEN";
var TweetTracker = require("tweettracker");

var tracker = TweetTracker(bearer_token).track("jack" /*USERNAME*/, {
  interval: 5000, // defaults to 10 seconds.
  emitLatest: true, // emit the latest tweet when the stream starts
});
tracker.on("tweet", function (tweet) {
  console.log(tweet); // log the tweet to the console
  /*
    tweet schema: 
    {
      id: (STRING , tweet id),
      text: (STRING , tweet text),
      media: [ (STRING ARRAY, media url links) ],
      name: (STRING , user name),
      username: (STRING , user username),
      profile_image_url: (STRING , user profile image url),
    }
    */
});

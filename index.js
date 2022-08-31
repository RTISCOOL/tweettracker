var TweetTracker = function (bearer_token) {
  const { TwitterApi } = require("twitter-api-v2");
  const client = new TwitterApi(bearer_token);
  const roClient = client.readOnly;

  var track = (username, options = {}) => {
    var events = require("events");
    var eventEmitter = new events.EventEmitter();

    var lastTweet = 0;
    var user = null;
    var loop = async function () {
      if (!user) user = (await getUserByName(username)).data;
      var tweets = await getLatestTweets(user, lastTweet);
      if (tweets.length > 0) {
        if (lastTweet == 0) {
          lastTweet = tweets[0].id;
          if (options.emitLatest) {
            eventEmitter.emit("tweet", tweets[0]);
          }
        } else {
          tweets.forEach(function (tweet) {
            eventEmitter.emit("tweet", tweet);
            lastTweet = tweet.id;
          });
        }
      }
      setTimeout(loop, options.interval || 10000);
    };
    loop();
    return eventEmitter;
  };

  var getLatestTweets = async (user, lastTweet) => {
    const timeline = await client.v2.userTimeline(user.id, {
      expansions: ["attachments.media_keys", "referenced_tweets.id"],
      "media.fields": ["url"],
      max_results: 5,
      exclude: ["replies"],
      since_id: lastTweet == 0 ? undefined : lastTweet,
    });
    var tweets = [];

    for await (const tweet of timeline) {
      const medias = timeline.includes.medias(tweet);

      if (medias.length) {
        tweet.media = medias.map((media) => media.url);
      }
      tweet.name = user.name;
      tweet.username = user.username;
      tweet.profile_image_url = user.profile_image_url;
      tweet.userID = user.id;
      tweets.push(tweet);
      if (tweets.length == 5) {
        break;
      }
    }
    return tweets;
  };
  var getUserByName = async (username) => {
    const user = await client.v2.userByUsername(username, {
      expansions: ["pinned_tweet_id"],
      "user.fields": ["id", "name", "profile_image_url"],
    });
    return user;
  };
  return {
    track: track,
  };
};

module.exports = TweetTracker;


# Twitter Tweet Tracker NodeJS

This package tracks a users tweets and outputs them with an event emitter. 




## Installation

Install tweettracker with npm

```bash
  npm install tweettracker
```
    
## Usage/Examples

A full example is availible in ./example.js


```javascript
var tweettracker = TweetTracker(bearer_token);

var tracker = tweettracker.track("jack" /*USERNAME*/, {
  interval: 5000, // defaults to 10 seconds.
  emitLatest: true, // emit the latest tweet when the stream starts
});

tracker.on("tweet", function (tweet) {
  console.log(tweet); // log the tweet to the console
});

```

Object that is returned in the event handler

```javascript
{
    id: (STRING , tweet id),
    text: (STRING , tweet text),
    media: [ (STRING ARRAY, media url links) ],
    name: (STRING , user name),
    username: (STRING , user username),
    profile_image_url: (STRING , user profile image url),
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Authors

- Ryan Trattner [@RTISCOOL](https://www.github.com/RTISCOOL)


## License

[MIT](https://choosealicense.com/licenses/mit/)


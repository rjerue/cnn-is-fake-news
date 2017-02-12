var Tee = require("../../twitter.js");
var urlExpander = require('expand-url');
var Q = require("q");
var request = require("request");

function expandUrl(shortUrl) {
    return Q.ncall(request, null, {
        method: "HEAD",
        url: shortUrl,
        followAllRedirects: true
        // If a callback receives more than one (non-error) argument
        // then the promised value is an array. We want element 0.
    }).get('0').get('request').get('href');
}

module.exports = {
    twitterQuery: function(qry, callback) {
        console.log(qry);
        var T = Tee.getKey();
        T.get('search/tweets', {
            q: qry,
            count: 10
        }, function(err, data, response) {
            //console.log('Found: ' + data.statuses.length)
            data = data.statuses.map(
                (i) => {
                    let tweet = {
                        id: i.id,
                        text: i.text,
                        entities: i.entities,
                        user: i.user,
                        newUrl: ""
                    }
                    //console.log("Tweet is " + JSON.stringify(tweet));
                    if (typeof tweet.entities.urls[0] !== 'undefined') {
                        if (typeof tweet.entities.urls[0].expanded_url !== 'undefined') {
                            //urlExpander.expand(tweet.entities.urls[0].expanded_url, function(err, longUrl) {
                            //tweet.newUrl = longUrl;
                            tweet.newUrl = tweet.entities.urls[0].expanded_url;
                            return tweet;
                            //});
                        }
                    }
                }
            );
            callback(data);
        });
    }
}

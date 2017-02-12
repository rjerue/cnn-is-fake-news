var Tee = require("../../twitter.js");

module.exports = {
    twitterQuery: function(qry, callback) {
        console.log("Query is " + 'list:rjerue/real-news + ' + qry.join().replace(',', ' ') + ' filter:links');
        var T = Tee.getKey();
        T.get('search/tweets', {
            q: 'list:rjerue/real-news + ' + qry.join().replace(',', ' ') + ' filter:links',
            count: 50
        }, function(err, data, response) {
            //console.log('Found: ' + data.statuses.length)
            data = data.statuses.filter(
                (i) => {
                    let tweet = {
                        id: i.id,
                        text: i.text,
                        entities: i.entities,
                        user: i.user
                    }
                    //console.log("Tweet is " + JSON.stringify(tweet));
                    if (typeof tweet.entities.urls[0] !== 'undefined') {
                        if (typeof tweet.entities.urls[0].expanded_url !== 'undefined')
                            return true;
                    }
                }
            );
            callback(data);
        });
    }
}
/*
twitterQuery: function(qry, res) {
    T = Tee.getKey();
    T.get('search/tweets', {
        q: 'qry',
        count: 10
    }, function(err, data, response) {
        console.log(data);
        var data2 = [].concat.apply([], data.statuses.map(
            (e) => {
                if (e.entities.urls.length > 0) {
                    return e.entities.urls.map(
                        (z) => {
                            console.log(z);
                            return z.expanded_url;
                        }
                    )
                }
            }
        )).filter(function(n) {
            return n != undefined
        });
        //console.log(data2);
        res.send(data2);
    });
}*/

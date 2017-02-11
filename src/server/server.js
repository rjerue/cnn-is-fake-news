var Twit = require("twit");


module.exports = {
    basicPlease: function(res) {
        T.get('search/tweets', {
            q: 'list:rjerue/real-news+filter:links',
            count: 100
        }, function(err, data, response) {
            console.log(data);
            res.end(JSON.stringify(data));
        });
    }
}

var Tee = require("../../twitter.js");

module.exports = {
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
    }
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const twitterTools = require('./utils/twitterTools');
const watsonTools = require('./utils/watson')
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/url/:url', (req, res) => {

    console.log('list:rjerue/real-news + ' + req.params.url.split("_").filter((e, i) => {
        if (e !== "" && e !== "http:" && e !== "https:" && i <= 6)
            return e;
    }).join().replace(/,/g, ' ') + ' filter:links');

    twitterTools.twitterQuery(
        'list:rjerue/real-news + ' + req.params.url.split("_").filter((e, i) => {
            if (e !== "" && e !== "http:" && e !== "https:" && i <= 6)
                return e;
        }).join().replace(/,/g, ' ') + ' filter:links',
        function(realNews) {
            //Reference real news with the given url
            twitterTools.twitterQuery(
                'list:rjerue/fake-news + ' + req.params.url.split("_").filter((e, i) => {
                    if (e !== "" && e !== "http:" && e !== "https:" && i <= 6)
                        return e;
                }).join().replace(/,/g, ' ') + ' filter:links',
                function(fakeNews) {
                    console.log('body', req.body);
                    watsonTools.watson(req.body.url, function(stu) {
                        var sc = [stu.keywords[0], stu.concepts[0]].join().replace(/,/g, ' ');
                        twitterTools.twitterQuery(
                            'list:rjerue/real-news + ' + sc + ' filter:links',
                            function(resu) {
                                var isReal = false;
                                var isFake = false;
                                if (typeof realNews !== 'undefined') {
                                    if (realNews.map((e) => {
                                            if (typeof e !== 'undefined') {
                                                return e.newUrl
                                            }
                                        }).includes(req.body.url)) {
                                        isReal = true
                                    }
                                }
                                if (typeof fakeNews !== 'undefined') {
                                    if (fakeNews.map((e) => {
                                            if (typeof e !== 'undefined') {
                                                return e.newUrl
                                            }
                                        }).includes(req.body.url)) {
                                        isFake = true
                                    }
                                }
                                if (isReal && isFake || (isReal === false && isFake === false)) {
                                    //unsure
                                    res.send({
                                        status: "unsure",
                                        data: {
                                            real: filter_array(realNews),
                                            fake: filter_array(fakeNews),
                                            sug: resu
                                        }
                                    });
                                }
                                if (isReal) {
                                    res.send({
                                        status: "real",
                                        data: filter_array(realNews),
                                        sug: resu
                                    });
                                }
                                if (isFake) {
                                    res.send({
                                        status: 'fake',
                                        data: filter_array(fakeNews),
                                        sug: resu
                                    })
                                }
                            }
                        );
                    });
                }
            );
        }
    );
});

app.get('/ha', (req, res) => {
    res.send({
        text: 'YES'
    });
});

module.exports = app;

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

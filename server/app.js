const express = require('express');
const morgan = require('morgan');
const path = require('path');
const twitterTools = require('./utils/twitterTools');
const watsonTools = require('./utils/watson')
const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/url/:url', (req, res) => {
    console.log(req.params.url.split("_").filter((e, i) => {
      if(e !== "" && e !== "http:" && e !== "https:" && i <= 6)
        return e;
      }));
    twitterTools.twitterQuery(
      req.params.url.split("_").filter((e, i) => {
        if(e !== "" && e !== "http:" && e !== "https:" && i <= 6)
          return e;
        }),
        function(tweets){
          res.send(tweets);
        }
    );
});

app.get('/ha', (req, res) => {
    res.send({
        text: 'YES'
    });
});

module.exports = app;

// adapted from code via Shawn Avery's 'Connect!' Class at ITP NYU

//p5 to database

var datastore = require('nedb');
var db = new datastore({ filename: 'database.json', timestampData: true, autoload: true });

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonBodyparser = bodyParser.json({ limit: "1000kb" });

app.use(express.static('.'))

app.use(jsonBodyparser);

app.get('/data', function(req, res) {
    db.find({}).sort({ createdAt: -1 }).limit(6).exec(function(err, docs) {
        res.send(docs);
    })
})

app.post('/save', function(req, res) {
    // console.log(req.body);
    db.insert(req.body, function(err, newDocs) {
        console.log(newDocs);
        res.send({});
    })
});

app.listen(3000, function() {
    console.log('example app listening on port 3000!')
});
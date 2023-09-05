let express = require('express');
let app = express();
require('dotenv').config()

console.log("Hello World")

app.use("/public", express.static(__dirname + "/public"));
app.use(function middlewareFunction(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});
app.get('/', function(req, res) {
    let absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath);
})

app.get('/json', function(req, res) {
    let string = "Hello json";
    res.json({"message": process.env.MESSAGE_STYLE == 'uppercase' ? string.toUpperCase() : string})
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time": req.time});
});

app.get('/:word/echo', function(req, res) {
    let word = req.params.word;
    res.json({"echo": word});
});

app.get('/name', function(req, res) {
    let query = req.query;
    res.json({"name": query.first+" "+query.last});
});


































 module.exports = app;

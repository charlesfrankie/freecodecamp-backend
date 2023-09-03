let express = require('express');
let app = express();
require('dotenv').config()

console.log("Hello World")

app.use("/public", express.static(__dirname + "/public"));
app.use(function(req, res, next) {
    console.log(req.method+ ' - ' +req.ip);
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



































 module.exports = app;

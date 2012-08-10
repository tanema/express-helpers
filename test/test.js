var testHelper = require('./helpers.test.js');
console.log("all tests completed successfully!");

var express = require("express");
var app = express.createServer ? express.createServer() : express();
var helpers = require('../lib/express-helpers')(app);
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.set('view options', {layout: false});

app.get('/', function(req, res){
    res.render('test', {user: {id: 5, username: 'tim', name: 'Tim'}});
});
app.get('/test', function(req, res){
    res.render('test', {user: {id: 5, username: 'tim', name: 'Tim'}});
});

app.listen(3000);
console.log("testing node started on port 3000");
var testHelper = require('./helpers.test.js');
var express = require("express");
var app = express.createServer();
var helpers = require('../lib/express-helpers')(app);
for (test in testHelper) {
	testHelper[test]();
}
console.log("all tests completed successfully!");

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.set('view options', {layout: false});

app.get('/', function(req, res){
    res.render('test', {user: {username: 'tim', name: 'Tim'}});
});

app.listen(3000);
console.log("testing node started on port 3000");
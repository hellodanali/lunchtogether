var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.sendFile(__dirname+ '/index.html');
});

var groups = [];
app.post('/groups', function(req, res){
	var user = req.body;
	groups.push(user);
	console.log('post requesting:', user);
	res.send(user);
});

app.get('/groups', function(req, res){
	console.log('get requesting',groups);
	res.send(groups);
})

app.listen(3000)
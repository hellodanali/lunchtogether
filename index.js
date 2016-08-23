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
	if(typeof user.text === 'string'){
		groups.forEach(function(group){
			if(group.text.key == user.id){
				group.text.names.push(user.text);
			}
		})
	}else{
		groups.push(user);		
	}

	res.send(user);

});

app.get('/groups', function(req, res){
	console.log('get requesting',groups);
	res.send(groups);
})

app.listen(3000)
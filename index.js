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
		check(groups);	
	}
	
	res.send(user);
});

app.get('/groups', function(req, res){
	console.log('get requesting, groups[]:',groups);
	res.send(groups);
})



//Helper Function:
function check(array){
	console.log('checking time....');
	var currentTime = new Date();
	var currentHour = currentTime.getHours();
	var currentMinute = currentTime.getMinutes();
	var total = currentHour+'.'+currentMinute;

	total = parseFloat(total);
	array.forEach(function(group){
		var postTime = group.text.hour + '.' + group.text.minute;
		postTime = parseInt(postTime);

		if(total-postTime >= 0){
			console.log('expiring...');
			group.text.expired = true;
		}
	})
}

setInterval(function(){
	check(groups);
	console.log(groups);
}, 300000);





app.listen(3000)
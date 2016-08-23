var app = angular.module('app', ['ngRoute'])
var counter = 0;
app.controller('MakeGroup', function($scope, $location){
	$scope.change = function(){
		$location.path('/create');
	}
});

app.controller('Form', function($scope, $location, $http){
	$scope.newGroup = {};
	
	
	$scope.addGroup = function(){
		console.log(this.creator,this.time, this.location);
		$scope.newGroup.creator = this.creator;
		$scope.newGroup.time = this.time;
		$scope.newGroup.location = this.location;
		counter++;
		$scope.newGroup.key = counter;
		$scope.newGroup.names = [];
		
		$http.post('/groups', {text:$scope.newGroup}).success(function(data){
			console.log('data',data);
		})
		$location.path('/groups');
	}

	$scope.join = function(){
		$scope.newGroup.names.push(this.name);
		console.log('update:', $scope.newGroup.names);
		// $http.post('/groups', {text:$scope.newGroup}).success(function(data){
		// 	console.log('new person joined.', $scope.newGroup);
		// })
	}
});

app.controller('Groups', function($scope, $http){
	$scope.groups = [];
	$scope.names = [];
	$http.get('/groups').then(function(data){
		console.log('* get request data * ',data);
		$scope.groups = data.data;
	})


});

app.config(function($routeProvider){
	$routeProvider
	.when('/create',{
		templateUrl: 'form.html'
	})
	.when('/groups',{
		templateUrl: 'groups.html'
	})
})


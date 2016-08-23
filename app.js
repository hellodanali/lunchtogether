var app = angular.module('app', ['ngRoute'])

app.controller('MakeGroup', function($scope, $location){
	$scope.change = function(){
		$location.path('/create');
	}
});

app.controller('Form', function($scope, $location, $http, $attrs, $window){
	$scope.newGroup = {};
	
	
	$scope.addGroup = function(){
		console.log(this.creator,this.time, this.location);
		$scope.newGroup.creator = this.creator;
		$scope.newGroup.time = this.time;
		$scope.newGroup.location = this.location;

		var time = new Date();
		$scope.newGroup.key = time.getTime();
		$scope.newGroup.names = [];

		$http.post('/groups', {text:$scope.newGroup}).success(function(data){
			console.log('data',data);
		})
		$location.path('/groups');
	}

	$scope.join = function(){
		console.log('update:', $scope.name, $attrs.id);
		$http.post('/groups', {text:$scope.name, id: $attrs.id}).success(function(data){
			console.log('new person joined.',data);
		});
		// $location.path('/groups');
		 $window.location.reload();
	}
});

app.controller('Groups', function($scope, $http){
	$scope.groups = [];
	$scope.names = [];
	$http.get('/groups').then(function(data){
		console.log('* get request data * ',data);
		$scope.groups = data.data;;
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


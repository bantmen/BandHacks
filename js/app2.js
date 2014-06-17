var app = angular.module('myapp', []);

app.config(function($routeProvider) {
	$routeProvider.when('/tasks', {
		templateUrl: "tasks.html", 
		controller: 'TestController2'
	});
	$routeProvider.when('/hello', {
		templateUrl: "deneme.html", 
		controller: 'HelloWorldCtrl'
	})
	.otherwise({redirectTo: '/dashboard.html'});
});

app.controller('TestController', function(){

});

app.controller('TestController2', function($scope){
	$scope.test = "hello";
	var taskList = [];
	$scope.createTask = function (task) {
		taskList.push(task);
		$scope.taskDisplay = "";
		var temp = "";
		for (var i=0;i<taskList.length;i++) {
			temp += (i+1).toString() + "- " + taskList[i] + '<br>';
			console.log(temp);
		}	
		$scope.taskDisplay = temp;
	};
/* 	inputCheck = function(inputString) {
		if () {}
		else return true;
	}; */
});

app.controller("HelloWorldCtrl", function ($scope){
   $scope.helloMessage="Hello World";
});
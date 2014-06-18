var app = angular.module('myApp', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider.when('/tasks', {
		templateUrl: "tasks.html", 
		controller: 'TasksController'
	});
	$routeProvider.when('/hello', {
		templateUrl: "deneme.html", 
		controller: 'HelloWorldCtrl'
	});
//	.otherwise({redirectTo: '/dashboard.html'});
})

/* .controller('TasksController', function($scope, $sce){
	var taskList = [];
	$scope.createTask = function (task) {
		if (inputCheck(task)) {
			taskList.push(task);
			$scope.taskDisplay = "";
			var temp = "";
			for (var i=0;i<taskList.length;i++) {
				temp += (i+1).toString() + "- " + taskList[i] + '<br>';
				console.log(temp);
			}	
			// $sce.trustAsHtml($scope.taskDisplay);
			$scope.taskDisplay = temp;
		}
		else $scope.tempTask = "Please do not use angular brackets.";

	};
	inputCheck = function(inpStr) {
		if (inpStr.search('<') != -1 && inpStr.search('>') != -1 && inpStr.search('<br>') == 0) {
			return false;
		}
		else return true;
	};
}) */

.controller('TasksController', function($scope){
	var self = this;
	self.tasks = [{}];  //tasks.num and tasks.task
	self.createTask = function (data) {
		self.tasks.push({task: data});
		console.log(self.tasks);
	};
	self.deleteTask = function (data) {
		var index = self.tasks.indexOf(data);
		self.tasks.splice(index, 1);
	};
	self.deleteTask();  //to get rid of the first, idle X mark
})

.controller("UserController", function($scope, $http){  //username, userpicture etc.
	$http.get('/api/user')
		.success(function(data){
			$scope.userName = data.username;
			console.log('Success: ' + data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	if (!$scope.userName) {$scope.userName = 'TESTNAME';}
})

.controller("HelloWorldController", function ($scope){
   $scope.helloMessage="Hello World";
});



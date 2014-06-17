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
	console.log('first');
	$scope.test = "hello";
	var taskList = [];
	$scope.createTask = function (task) {
		if (inputCheck(task)) {
			console.log('I came');
			taskList.push(task);
			$scope.taskDisplay = "";
			var temp = "";
			for (var i=0;i<taskList.length;i++) {
				temp += (i+1).toString() + "- " + taskList[i] + '<br>';
				console.log(temp);
			}	
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
	function occurrences(string, subString, allowOverlapping){  //from stackoverflow
		string+=""; subString+="";
		if(subString.length<=0) return string.length+1;

		var n=0, pos=0;
		var step=(allowOverlapping)?(1):(subString.length);

		while(true){
			pos=string.indexOf(subString,pos);
			if(pos>=0){ n++; pos+=step; } else break;
		}
		return(n);
	}
});

app.controller("HelloWorldCtrl", function ($scope){
   $scope.helloMessage="Hello World";
});
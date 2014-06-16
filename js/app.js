//console.log('logged');
var app = angular.module('bandHacks', []);

app.config(function($routeProvider) {
	$routeProvider.when('/a', {
		templateUrl: "angulartest5.html", 
		controller: 'TestController2'
	});
	$routeProvider.when('/hi', {
		templateUrl: "angulartest6.html", 
		controller: 'TestController'
	});
//	.otherwise({redirectTo: '/'});
});

app.controller('TestController', function(){

});

app.controller('TestController2', function($scope){
	$scope.test = "hello";
});
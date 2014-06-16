'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('bandHacks', [
  'ngRoute',
  'bandHacks.filters',
  'bandHacks.services',
  'bandHacks.directives',
  'bandHacks.controllers'
]).

    /* removed routes for testing purposes
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
      templateUrl: '/dashboard.html',
      controller: 'DashController'});
  $routeProvider.when('/tasks', {
      templateUrl: '/tasks.html',
      controller: 'TasksController'});
  $routeProvider.otherwise({redirectTo: '/dashboard.html'});
}]
*/

    //dash controller
app.controller('DashController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
})

    //tasks controller
app.controller('TasksController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';

})
);

var app = angular.module('myApp', ['ngRoute', 'fundoo.services'])

.config(function($routeProvider) {
	$routeProvider.when('/tasks', {
		templateUrl: "tasks.html"
		//controller: 'TasksController'
	});
    $routeProvider.when('/shows', {
        templateUrl: "shows.html",
        controller: 'ShowsController'
    });
//	.otherwise({redirectTo: '/dashboard.html'});
})

.controller('TasksController', function($scope, $http, $rootScope){
	var self = this;
    self.tasks = [];
    $http.get('/api/tasks-retrieve')
        .success(function(data){
            if (!data){
                console.log('Empty success');
            }
            else{
                self.tasks = data;
                console.log('Success: ' + data);
            }
            console.log(self.tasks);
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
    $scope.createTask = function (data) {
		self.tasks.push(data);
        var jData = JSON.stringify(self.tasks);
        console.log(jData);
        $http.post('/api/tasks-create', jData).then(function(res) {
            console.log(res);
            $rootScope.tempTask = null;  //reset tempTask after success
        });
	};
    $scope.deleteTask = function (data) {
		var index = self.tasks.indexOf(data);
		self.tasks.splice(index, 1);
        var jData = JSON.stringify({'ind' : index});
        console.log(jData);
        $http.post('/api/tasks-delete', jData).then(function(res) {
            console.log(res);
        });
	};
    //$scope.deleteTask();  //to get rid of the first, idle X mark
})

.controller('ShowsController', function($scope){
    var self = this;
    self.shows = [{}];

    $scope.createShow = function (data) {
        self.shows.push({shows: data});
        console.log(self.shows);
    };
    $scope.deleteShow = function (data) {
        var index = self.shows.indexOf(data);
        self.shows.splice(index, 1);
    };
    $scope.deleteShow();  //to get rid of the first, idle X mark
})

.controller("UserController", function($scope, $http){  //username, userpicture etc.
	$http.get('/api/user')
		.success(function(data){
			$scope.userName = data.username;
			console.log('Success: ' + data.username);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	if (!$scope.userName) {$scope.userName = 'TESTNAME';}
})

.controller("HelloWorldController", function ($scope){
   $scope.helloMessage="Hello World";
})

.controller('dialogServiceTest',function($scope,$rootScope,$timeout,$dialogs){
    $scope.confirmed = 'You have yet to be confirmed!';
    $scope.name = '"Your name here."';

    $scope.launch = function(which){
        var dlg = null;
        switch(which){

            // Error Dialog
            case 'error':
                dlg = $dialogs.error('This is my error message');
                break;


            case 'addShow':
                dlg = $dialogs.create('/addShow.html','whatsYourNameCtrl',{},{key: false,back: 'static'});
                dlg.result.then(function(name){
                    $scope.name = name;
                },function(){
                    $scope.name = 'You decided not to enter in your name, that makes me sad.';
                });

            // Wait / Progress Dialog
            case 'wait':
                dlg = $dialogs.wait(msgs[i++],progress);
                fakeProgress();
                break;

            // Notify Dialog
            case 'notify':
                dlg = $dialogs.notify('Something Happened!','Something happened that I need to tell you.');
                break;

            // Confirm Dialog
            case 'confirm':
                dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
                dlg.result.then(function(btn){
                    $scope.confirmed = 'You thought this quite awesome!';
                },function(btn){
                    $scope.confirmed = 'Shame on you for not thinking this is awesome!';
                });
                break;

            // Create Your Own Dialog
            case 'create':
                dlg = $dialogs.create('/dialogs/whatsyourname.html','whatsYourNameCtrl',{},{key: false,back: 'static'});
                dlg.result.then(function(name){
                    $scope.name = name;
                },function(){
                    $scope.name = 'You decided not to enter in your name, that makes me sad.';
                });

                break;
        }; // end switch
    }; // end launch

})
/*MODAL POP UPS*/
    .controller('MainCtrl', ['$scope', 'createDialog', '$rootScope', function($scope, createDialogService, $rootScope) {
        $scope.$watch('tempTask', function(){
            $rootScope.tempTask = $scope.tempTask;
        });
        $scope.launchInlineModal = function() {
            createDialogService({
                id: 'simpleDialog',
                template:
                    '<div class="row-fluid">' +
                    ' <h3>Venue Name</h3>' +
                    ' <div>' +
                    '   <div class="codebox">' +
                    '<pre>' +
                    'createDialog({\n' +
                    '    id: "inlineDialog",\n' +
                    '    <span style="color:red">template: "&lt;div>&lt;!--template HTML here...-->&lt;/div>"</span>\n' +
                    '    title: "A Inline Modal Dialog",\n' +
                    '    backdrop: true,\n' +
                    '    success: {\n' +
                    '        label: "Yay",\n' +
                    '        fn: function(){\n' +
                    '            console.log("Inline modal closed");\n' +
                    '        }\n' +
                    '    }\n' +
                    '});\n' +
                    '</pre>\n' +
                    '   </div>\n' +
                    ' </div>\n' +
                    '</div>',
                title: 'Add A Show',
                backdrop: true,
                success: {label: 'Success', fn: function() {console.log('Inline modal closed');}}
            });
        };
        $scope.launchObjectModal = function() {
            createDialogService({
                id: 'simpleDialog',
                template: angular.element(
                        '<div class="row-fluid">' +
                        ' <h3>This is how the Simple Modal was launched</h3>' +
                        ' <div>' +
                        '   <div class="codebox">' +
                        '<pre>' +
                        'createDialog({\n' +
                        '    id: "objectDialog",\n' +
                        '    <span style="color:red">template: angular.element("...")</span>\n' +
                        '    title: "A Object Modal Dialog",\n' +
                        '    backdrop: true,\n' +
                        '    success: {\n' +
                        '        label: "Yay",\n' +
                        '        fn: function(){\n' +
                        '            console.log("Object modal closed");\n' +
                        '        }\n' +
                        '    }\n' +
                        '});\n' +
                        '</pre>\n' +
                        '   </div>\n' +
                        ' </div>\n' +
                        '</div>'),
                title: 'A Object Modal Dialog',
                backdrop: true,
                success: {label: 'Success', fn: function() {console.log('Object modal closed');}}
            });
        };
        $scope.launchSimpleModal = function() {
            createDialogService('addShow.html', {
                id: 'simpleDialog',
                title: 'Add A Show',
                backdrop: true,
                success: {label: 'Add Show', fn: function() {console.log('Add Show Modal Closed');}}
            });
        };
	
	$scope.addTaskPopUp = function() {
            createDialogService('addTask.html', {
                id: 'simpleDialog',
                title: 'Add A Task',
                backdrop: true,
                success: {label: 'Add Task', fn: function() {
                        $scope.createTask($scope.tempTask);
                    }
                }
            });
        };

    $scope.addMerchPopUp = function() {
        createDialogService('addMerch.html', {
            id: 'simpleDialog',
            title: 'Add Merch',
            backdrop: true,
            success: {label: 'Add Merch', fn: function() {}}
        });
    };
	
	
        $scope.launchComplexModal = function() {
            createDialogService('complexModal.html', {
                id: 'complexDialog',
                title: 'A Complex Modal Dialog',
                backdrop: true,
                controller: 'ComplexModalController',
                success: {label: 'Success', fn: function() {console.log('Complex modal closed');}}
            }, {
                myVal: 15,
                assetDetails: {
                    name: 'My Asset',
                    description: 'A Very Nice Asset'
                }
            });
        };
    }])
    .factory('SampleFactory', function() {
        return {
            sample: function() {
                console.log('This is a sample');
            }
        };
    })
    .controller('ComplexModalController', ['$scope', 'SampleFactory', 'myVal', 'assetDetails',
        function($scope, SampleFactory, myVal, assetDetails) {
            $scope.myVal = myVal;
            $scope.asset = assetDetails;
            SampleFactory.sample();
        }])
    /* end modal testing */

.controller('whatsYourNameCtrl',function($scope,$modalInstance,data){
	$scope.user = {name : ''};

	$scope.cancel = function(){
		$modalInstance.dismiss('canceled');
	}; // end cancel

	$scope.save = function(){
		$modalInstance.close($scope.user.name);
	}; // end save

	$scope.hitEnter = function(evt){
		if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
			$scope.save();
	}; // end hitEnter
}) // end whatsYourNameCtrl
.run(['$templateCache',function($templateCache){
	$templateCache.put('/dialogs/whatsyourname.html','<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="username">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div></div></div></div>');
}]); // end run / controllers / module
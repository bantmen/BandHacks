var app = angular.module('myApp', ['ngRoute', 'fundoo.services'])

.config(function($routeProvider) {
	$routeProvider.when('/tasks', {
		templateUrl: "tasks.html"
	});
    $routeProvider.when('/shows', {
        templateUrl: "shows.html"
    });
    $routeProvider.when('/finances', {
        templateUrl: "finances.html"
    });
    $routeProvider.when('/merch', {
        templateUrl: "merch.html"
    });
    $routeProvider.when('/contacts', {
        templateUrl: "contacts.html"
    });
    $routeProvider.when('/dashhome', {
        templateUrl: "dashhome.html"
    });
//	.otherwise({redirectTo: '/dashboard.html'});
})

.controller('TasksController', function($scope, $http, $rootScope){
	var self = this;
    if (!self.tasks) self.tasks = [];
    $rootScope.createTask = function (data) {
		self.tasks.push(data);
        console.log(self.tasks);
        var jData = JSON.stringify({'task':data});
        console.log(jData);
        $http.post('/api/tasks-create', jData).then(function(res) {
            console.log(res);
            $rootScope.apply(function(){
                $rootScope.tempTask = null;  //reset tempTask after success
            });
        });
	};
    $http.get('/api/tasks-retrieve')
        .success(function(data){
            if (!data){
                console.log('Empty success');
            }
            else{
                self.tasks = data;
                console.log('Success: ' + data);
            }
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
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

//Finances controller
.controller('FinanceCtrl', function(){
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

//Modal Pop Ups
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
                        $rootScope.createTask($rootScope.tempTask);
                    }
                }
            });
        };

    $scope.addBandPopUp = function() {
        createDialogService('addBand.html', {
            id: 'simpleDialog',
            title: 'Add Your Band',
            backdrop: true,
            success: {label: 'Add Task', fn: function() {
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

.controller('DashCtrl', function($scope) {
        $scope.config = {
            title: 'Products',
            tooltips: true,
            labels: false,
            mouseover: function () {
            },
            mouseout: function () {
            },
            click: function () {
            },
            legend: {
                display: true,
                //could be 'left, right'
                position: 'right'
            }
        };

        //we should have this sync up to a database or sync up to imported info
        $scope.data = {
            series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
            data: [
                {
                    x: "Laptops",
                    y: [100, 500, 0],
                    tooltip: "this is tooltip"
                },
                {
                    x: "Desktops",
                    y: [300, 100, 100]
                },
                {
                    x: "Mobiles",
                    y: [351]
                },
                {
                    x: "Tablets",
                    y: [54, 0, 879]
                }
            ]
        };
    })
//end DashController
            
//start of datepicker            
var DatepickerDemoCtrl = function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};
//end of datepicker functions

app.run(['$templateCache',function($templateCache){
	$templateCache.put('/dialogs/whatsyourname.html','<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="username">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div></div></div></div>');
}]); // end run / controllers / module
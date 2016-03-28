var myAppControllers = angular.module('myAppControllers', []);

myApp.controller('homeCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

	$scope.name = $routeParams.name;
}]);

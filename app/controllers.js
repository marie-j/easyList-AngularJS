var myAppControllers = angular.module('myAppControllers', []);

var list = new browserdb("list");
var recipe = new browserdb("recipe");

myApp.controller('listCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

	$scope.list = list.all();

	$scope.deleteList = function() {
		$scope.list = [];
		list.replaceAll($scope.list);
	}

	$scope.addToList= function(title,number,article) {
		var element;

		if (title != undefined) {
			element = {
				name: title,
				quantity: number
			}
		}
		else if (article != undefined) {
			element = {
				name: article,
				quantity: ""
			}
		}
		else {
			return;
		}

		$scope.list.push(element);
		list.replaceAll($scope.list);
	}

}])

myApp.controller('recipeCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);

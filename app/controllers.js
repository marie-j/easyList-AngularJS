var myAppControllers = angular.module('myAppControllers', []);

var list = new browserdb("list");
var recipe = new browserdb("recipe");

myApp.controller('listCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

	$scope.list = list.all();
	$scope.checked = [];

	$scope.deleteList = function() {
		$scope.list = [];
		$scope.checked = [];
		list.replaceAll($scope.list);
	}

	$scope.addToList= function() {
		var element;

		var title = $scope.title;
		var number = $scope.number;
		var article = $scope.article;

		if ($scope.title != undefined) {
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

		$scope.title=undefined;
		$scope.number=undefined;
		$scope.article= undefined;

		$scope.list.push(element);
		$scope.checked.push(false);
		list.replaceAll($scope.list);
	}

	$scope.checkElement = function(index) {
		$scope.checked[index] = true;
	}

	$scope.uncheckElement = function(index) {
		$scope.checked[index] = false;
	}

	$scope.deleteElement = function(index) {
		$scope.list.splice(index,1);
		$scope.checked.splice(index,1);
		list.replaceAll($scope.list);
	}

}])

myApp.controller('recipeCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);

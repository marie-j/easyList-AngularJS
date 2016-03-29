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
		$scope.forms = [];
		$scope.recipe = recipe.all();

		$scope.addIngredient = function() {
			var f = {
				title: undefined,
				quantity: undefined,
				unit: undefined
			}
			$scope.forms.push(f);
		}

		$scope.addRecipe = function() {
			var ingredients = [];
			var forms = $scope.forms
			for (var i = 0 ; i <forms.length ; i++) {
				if (forms[i].ingredient != undefined) {
					ingredients.push(forms[i]);
				}
			}

			var title = $scope.title;

			if (title == undefined) {
				alert("Vous n'avez pas donné de nom à votre recette");
			}

			else {
				var search = function(e) {
					return e.title == title;
				}

				var trouve = $scope.recipe.find(search);
				if (trouve != undefined) {
					alert("Une recette porte déjà ce nom !")
				}
				else {

					var r = {
						title: title,
						number: $scope.number,
						ingredients: ingredients
					}
					$scope.recipe.push(r);
					recipe.replaceAll($scope.recipe);
					$scope.title= undefined;
					$scope.forms = [];
				}
			}
		}


}]);

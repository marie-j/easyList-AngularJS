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

			var search = function(e) {
				return e.title == title;
			}

			var found = recipe.all().find(search);
			var coef;

			if (number == undefined || number == found.number) {
				coef = 1;
			}
			else {
				coef = number/found.number;
			}

			if (found != undefined) {
				for (var i = 0 ; i < found.ingredients.length ; i++) {
					var q = found.ingredients[i].quantity * coef;
				element = {
					name: found.ingredients[i].ingredient,
					quantity: q,
					unit: found.ingredients[i].unit
				}
				$scope.list.push(element);
				$scope.checked.push(false);
			}
			}
			else {
				alert("Cette recette n'existe pas !");
			}
		}
		else if (article != undefined) {
			element = {
				name: article,
				quantity: "",
				unit:""
			}
			$scope.list.push(element);
			$scope.checked.push(false);
		}
		else {
			return;
		}

		$scope.title=undefined;
		$scope.number=undefined;
		$scope.article= undefined;

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
		$scope.showAll= true;
		$scope.searched = [];
		$scope.showIngredients = [];
		$scope.editR = [];
		$scope.editI = [];
		$scope.add = [];
		$scope.addI = [];

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

		$scope.lookFor = function(search) {
			if (!$scope.showAll){
				$scope.searched = [];
			}
			var r = $scope.recipe;
			for (var i = 0 ; i < r.length ; i ++) {
				if (r[i].title.substring(0,search.length) == search) {
					$scope.searched.push(r[i]);
				}
			}
			$scope.search = undefined;
			$scope.showAll = false;
		}

		$scope.goBack = function() {
			$scope.showAll = true;
		}

		$scope.showRecipe = function(index) {
			$scope.showIngredients[index] = true;
			$scope.editR[index] = false;
		}

		$scope.hide = function(index) {
			$scope.showIngredients[index] = false;
			$scope.editR[index] = false;
			$scope.add = [];
			$scope.addI[index] =false;
		}

		$scope.editRecipe = function(index) {
			$scope.showIngredients[index] = false;
			$scope.editR[index] = true;
		}

		$scope.deleteRecipe = function(index) {
			$scope.recipe.splice(index,1);
			recipe.replaceAll($scope.recipe);
		}

		$scope.editIngredient = function(indice,index) {
			$scope.editI[indice] =[];
			$scope.editI[indice][index] = true;
		}

		$scope.deleteIngredient = function(indice,index) {
			$scope.recipe[indice].ingredients.splice(index,1);
			recipe.replaceAll($scope.recipe);
		}

		$scope.validate = function(indice,index) {
			recipe.replaceAll($scope.recipe);
			$scope.editI[indice] =[];
			$scope.editI[indice][index] = false;
		}

		$scope.addIngredientToRecipe= function(index) {
			$scope.addI[index] = true;
			var i = {
				ingredient:undefined,
				quantity:undefined,
				unit:undefined
			}
			$scope.add.push(i);
		}

		$scope.addToR = function(index) {
		for (var i =0 ; i < $scope.add.length ; i++) {
			if ($scope.add[i] != undefined) {
				$scope.recipe[index].ingredients.push($scope.add[i]);
			}
		}
		recipe.replaceAll($scope.recipe);
		$scope.addI[index] = false;
		$scope.add = [];
		}

}]);

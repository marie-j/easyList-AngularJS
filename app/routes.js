var myApp = angular.module('myApp', [
  'ngRoute',
  'myAppControllers'
]);

myApp.config(['$routeProvider',

  function($routeProvider){

    $routeProvider
      .when('/list', {

        templateUrl: 'views/list.html',
        controller: 'listCtrl'
      })

      .when('/recipe', {

        templateUrl: 'views/recipe.html',
        controller: 'recipeCtrl'
      })

      .otherwise({
	      redirectTo: '/home/world !'
      });
  }
]);

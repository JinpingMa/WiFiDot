angular.module('wifidotApp', ['ngRoute']);

function config ($routeProvider) {
	$routeProvider
  .when('/', {
    templateUrl: 'home/home.view.html',
    controller: 'homeCtrl'，
    controllerAs: 'vm'
  })
  .otherwise({redirectTo: '/'});
}

angular
  .module('wifidotApp')
  .config(['$routeProvider', config]);
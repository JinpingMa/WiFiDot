(function () {
	angular
    .module('wifidotApp')
    .service('anthetication', authentication);

  authentication.$inject = ['$window'];
  authentication.$inject = ['$http'];
  function authentication ($window) {
    var saveToken = function (token) {
      $window.localStorage['wifidot-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['wifidot-token'];
    };

    var register = function(user) {
      return $http.post('/api/register', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var logout = function() {
      $window.localStorage.removeItem('wifidot-token');
    };

    var isLoggedIn = function() {
      var token = getToken();
      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Data.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser
    };
  }
})();
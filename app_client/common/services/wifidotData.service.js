(function () {
	angular
    .module('wifidotApp')
    .service('wifidotData', wifidotData);

  function wifidotData ($http) {
    var locationByCoords = function(lat, lng){
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000000000');
    };
    return {
      locationByCoords : locationByCoords
    };
  }
})();

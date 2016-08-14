(function () {

  angular
    .module('wifidotApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'wifidotData', 'geolocation'];
  function homeCtrl ($scope, wifidotData, geolocation) {
    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    vm.pageHeader = {
      title: 'WiFiDot',
      strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat? WiFiDot helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let WiFiDot help you find the place you're looking for."
    };
    vm.message = "Checking your location";

    vm.getData = function (position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      vm.message = "Search for nearby places";
      wifidotData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations : data };
        })
        .error(function (e) {
          vm.message = "Sorry,something's gone wrong, please try again later";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation not supported by this brower.";
      });
    };

    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);

  }

})();

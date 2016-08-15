(function () {

	angular
    .module('wifidotApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', 'wifidotData'];
  function locationDetailCtrl ($routeParams, wifidotData) {
    var vm = this;
    vm.sidebar = {
      context: 'is on WiFiDot because it has accessible wifi and spance to sit down with your laptop and get some work done.',
      callToAction: 'if you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        };
    vm.locationid = $routeParams.locationid;

    wifidotData.locationById(vm.locationid)
      .success(function(data) {
        vm.data = { location : data };
        vm.pageHeader = {
          title: vm.data.location.name
        };
        console.log(vm.data.location);
      }) 
      .error(function (e) {
        console.log(e);
      });
    
  }
})();
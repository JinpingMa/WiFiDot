(function () {

	angular
    .module('wifidotApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', '$location', '$modal', 'wifidotData', 'authentication'];
  function locationDetailCtrl ($routeParams,$location, $modal, wifidotData, authentication) {
    var vm = this;
    vm.sidebar = {
      context: 'is on WiFiDot because it has accessible wifi and spance to sit down with your laptop and get some work done.',
      callToAction: 'if you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        };
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    wifidotData.locationById(vm.locationid)
      .success(function(data) {
        vm.data = { location : data };
        vm.pageHeader = {
          title: vm.data.location.name
        };
        //baidumap
        var map = new BMap.Map("mapcontainer");
        var point = new BMap.Point(vm.data.location.coords[0], vm.data.location.coords[1])
        map.centerAndZoom(point, 17);
        // 创建图标对象 
        function addMarker(point) {   
          var myIcon = new BMap.Icon("/marker.png", new BMap.Size(52, 51), {
            offset: new BMap.Size(0, 0)
          });  
          var marker = new BMap.Marker(point, {
            icon: myIcon
          });
          map.addOverlay(marker);
        }
        addMarker(point);
        map.addControl(new BMap.NavigationControl()); //导航控件
        map.addControl(new BMap.CopyrightControl()); //版权控件
        map.enableScrollWheelZoom(true);
      }) 
      .error(function (e) {
        console.log(e);
      });

    vm.popupReviewForm = function () {
      //alert("Let's add a review!");
      var modalInstance = $modal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve: {
          locationData : function () {
            return {
              locationid : vm.locationid,
              locationName : vm.data.location.name
            };
          }
        }
      });
    
      modalInstance.result.then(function (data) {
        vm.data.location.reviews.push(data);
      });

    };
    
  }
})();
(function () {

  angular
    .module('wifidotApp')
    .directive('pageHeader', pageHeader);

  function pageHeader () {
	return {
    restrict: 'EA',
    scope: {
      thisRating : '=content'
    },
    templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
  };
}

})();

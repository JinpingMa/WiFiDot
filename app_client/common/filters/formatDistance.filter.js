(function () {

  angular
    .module('wifidotApp')
    .filter('formatDistance',formatDistance);


  var _isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function formatDistance () {
    return function (distance) {
      var numDistance, unit;
      if ((distance >= 0) && _isNumeric(distance)) {
        if (distance < 1000) {
          numDistance = parseInt(distance, 10)
          unit = 'm';
          // numDistance = parseFloat(distance).toFixed(1);
          // unit = 'km';
        } else {
          numDistance = parseFloat(distance / 1000).toFixed(1);
          unit = 'km';
          // numDistance = parseInt(distance * 1000, 10);
          // unit = 'm';
        }
        return numDistance + unit;
      } else {
        return "?";
      }
    };
  }

})();


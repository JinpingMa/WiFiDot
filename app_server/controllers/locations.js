var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
// if (process.env.NODE_ENV === 'production') {
//   apiOptions.server = "https://protected-spire-18793.herokuapp.com";
// }
/* GET 'home' page */

var _isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var _formatDistance = function(distance) {
  var numDistance, unit;
  if ((distance>=0) && _isNumeric(distance)) {
    if (distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = 'km';
    } else {
      numDistance = parseInt(distance * 1000,10);
      unit = 'm';
    }
    return numDistance + unit;
  } else {
    return "?";
  }
};

var renderHomepage = function (req, res, responseBody) {
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render('locations-list', { 
    title: 'WiFiDot - find a place to work with wifi',
    pageHeader: {
    	title: 'WiFiDot',
    	strapline: 'Find place to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? WiFiDot helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let WiFiDot help you find the place you're looking for.",
    locations: responseBody,
    message: message
  });
};
module.exports.homelist = function(req, res) {
  var requestOptions, path;
  path = "/api/locations";
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
      lng : 121.527121,
      lat : 31.083196,
      maxDistance : 20
    }
  };
  request (
    requestOptions,
    function(err, response, body) {
      var i,data;
      data = body;
      if (response.statusCode === 200 && data.length) {
        for (i = 0; i <data.length; i++) {
          console.log(data[i].distance);
          console.log(typeof(data[i].distance));
          data[i].distance = _formatDistance(data[i].distance);
        }
      }
      renderHomepage(req, res, data);
    });
};

var renderDetailPage = function (req, res) {
  res.render('location-info', {
      title: 'Starcups',
      pageHeader: {
        title: 'Starcups'
      },
      sidebar: {
        context: 'is on WiFiDot because it has accessible wifi and spance to sit down with your laptop and get some work done.',
        callToAction: 'if you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
      },
      location: {
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        coords: {
          lat: 51.455041,
          lng: -0.9690884
        },
        openingTimes: [{
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
        },{
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
        },{
          days: 'sunday',
          closed: true
        }],
        reviews: [{
          author: 'Hyperbola',
          rating: 5,
          timestamp: '16 July 2015',
          reviewText: 'What a great place. I can\'t say enough good things about it.'
        },{
          author: 'Lu Sai',
          rating: 3,
          timestamp: '16 June 2015',
          reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
        }]
      }
  });
};

/*GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  renderDetailPage(req, res);
};

/* GET 'Add review' page */
module.exports.addReview = function (req, res) {
    res.render('location-review-form', {
        title: 'Review Starcups on WiFiDot',
        pageHeader: {
          title: 'Review Starcups'
        }
    });
};
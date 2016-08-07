var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// post  a new review,providing a locationid
//   /api/locations/:locationid/reviews
module.exports.reviewsCreate = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

//get (/api/locations/:locationid/reviews/reviewid)
module.exports.reviewsReadOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

//  put (/api/locations/:locationid/reviews/reviewid)
module.exports.reviewsUpdateOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

// delete  (/api/locations/:locationid/reviews/reviewid)
module.exports.reviewsDeleteOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

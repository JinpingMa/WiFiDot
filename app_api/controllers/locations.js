var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonRespongse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//get list of locations  (/api/locations)
module.exports.locationsListByDistance = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

//post a new location  (/api/locations)
module.exports.locationsCreate = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

//get a location by the id  (/api/locations/:locationid)
module.exports.locationsReadOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

// put  (/api/locations/:locationid)
module.exports.locationsUpdateOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

// delete  (/api/locations/:locationid)
module.exports.locationsDeleteOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};
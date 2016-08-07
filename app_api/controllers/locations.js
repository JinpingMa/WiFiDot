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
  console.log('Finding location details',req.params);
  if (req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if(!location) {
          sendJsonRespongse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonRespongse(res, 404, err);
          return;
        }
        console.log(location);
        sendJsonRespongse(res, 200, location);
    });  
  } else {
    console.log('No locationid specified');
    sendJsonRespongse(res, 404, {
      "message": "No locationid in request"
    });
  }  
};

// put  (/api/locations/:locationid)
module.exports.locationsUpdateOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

// delete  (/api/locations/:locationid)
module.exports.locationsDeleteOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};
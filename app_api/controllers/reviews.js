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
  console.log('Finding single review');
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location) {
      	  console.log(location);
      	  var response,review;
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
          if (location.reviews && location.reviews.length > 0) {
        	  review = location.reviews.id(req.params.reviewid);
            if(!review) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                location : {
                  name : location.name,
                  id :req.params.locationid
                },
                review : review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJsonRespongse(res, 404, {
              "message" : "No reivews found"
            });
          } 
        }
    ); 
  } else {
    sendJsonRespongse(res, 404, {
      "message": "No found,locationid and reviewid are both required"
    });
  }  
};


//  put (/api/locations/:locationid/reviews/reviewid)
module.exports.reviewsUpdateOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

// delete  (/api/locations/:locationid/reviews/reviewid)
module.exports.reviewsDeleteOne = function(req, res) {
  sendJsonRespongse(res, 200, {"status": "success"});
};

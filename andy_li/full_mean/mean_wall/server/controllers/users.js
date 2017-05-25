var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = {
  index: function(req, res) {
    User.find({}).populate("messages comments").exec(function(err, users) {
      if(err) {
        return res.json(err);
      }
      return res.json(users);
    });
  },

  create: function(req, res) {
    User.create(req.body, function(err, user) {
      if(err) {
        return res.json(err);
      }
      return res.json(user);
    });
  },

  login: function(req, res) {
    // look up e-mail
    User.findOne({ email: req.body.email }, function(err, user) {
      if(err) {
        return res.json(err);
      }
      // check if User is not null and authenticate password
      if(user && user.authenticate(req.body.password)) {
        return res.json(user);
      }
      // invalid login credentials
      return res.json({
        "errors": {
          "password": {
            "message": "Invalid login credentials."
          }
        }
      });

    });
  },

  show: function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(err) {
        return res.json(err);
      }
      // if(!user){
      //   return res.json({
      //     errors: "User not found."
      //   });
      // }
      return res.json(user);
    });   // end User id query
  },

  delete: function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(err) {
        return res.json(err);
      }
      user.remove(function(err, user) {
        if(err) {
          return res.json(err);
        }
        return res.json(user);
      });
    });
  },

}

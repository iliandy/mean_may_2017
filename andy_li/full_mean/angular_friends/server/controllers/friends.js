var mongoose = require("mongoose");
var Friend = mongoose.model('Friend');

module.exports = {
  index: function(req, res){
    console.log("-= Reached /friends [get] =-");
    Friend.find({}).exec(function(err, friends) {
      if (err) {
        return res.json(err);
      }
      return res.json(friends);

    });
  },

  show: function(req,res){
    console.log("-= Reached /friends/id [get] =-");
    Friend.findById(req.params.id).exec(function(err, friend) {
      if(err) {
        return res.json(err);
      }
      if(!friend){
        return res.json({
          errors: "Friend not found."
        });
      }
      return res.json(friend);
    });   // end friend id query
  },

  create: function(req, res){
    console.log("-= Reached /friends [post] =-");
    // .save method
    // var friend = new Friend(req.body);
    // friend.save(function(err, friend) {
    //   if(err) {
    //     return res.json(err);
    //   }
    //   return res.json(friend);
    // });

    // .create method
    Friend.create(req.body, function(err, friend) {
      if(err) {
        return res.json(err);
      }
      return res.json(friend);
    });
  },

  update: function(req, res){
    console.log("-= Reached /friends/id [put/patch] =-");
    // .save method
    // Friend.findById(req.params.id).exec(function(err, friend) {
    //   if(err) {
    //     return res.json(err);
    //   }
    //   if(!friend){
    //     return res.json({
    //       errors: "Friend not found."
    //     });
    //   }
    //   // edit specific friend with form data
    //   friend.name = req.body.name;
    //   friend.save(function(err, friend) {
    //     if(err) {
    //       return res.json(err);
    //     }
    //     return res.json(friend);
    //   }); // end friend edit save
    //
    // }); // end friend id query

    // .findByIdandUpdate method
    Friend.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, friend) {
      if(err) {
        return res.json(err);
      }
      if(!friend){
        return res.json({
          errors: "Friend not found."
        });
      }
      return res.json(friend);
    });   // end friend id query
  },

  delete: function(req, res){
    console.log("-= Reached /friends/id [delete] =-");
    Friend.findByIdAndRemove(req.params.id).exec(function(err, friend) {
      if(err) {
        return res.json(err);
      }
      if(!friend){
        return res.json({
          errors: "Friend not found."
        });
      }
      return res.json(friend);
    });   // end friend id query
  },

}   // end of friends controller object

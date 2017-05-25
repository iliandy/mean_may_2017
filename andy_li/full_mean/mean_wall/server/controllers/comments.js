var mongoose = require("mongoose");

var Comment = mongoose.model("Comment");
var Message = mongoose.model("Message");
var User = mongoose.model("User");

module.exports = {
  index: function(req, res) {
    Comment.find({}, function(err, comments) {
      if(err) {
        return res.json(err);
      }
      return res.json(comments);
    });
  },

  create: function(req, res) {
    Comment.create(req.body, function(err, comment) {
      if(err) {
        return res.json(err);
      }
      Message.findByIdAndUpdate(req.body.message, { $push: { comments: comment._id }}, function(err, message) {
        if(err) {
          return res.json(err);
        }
        User.findByIdAndUpdate(req.body.user, { $push: { comments: comment._id }}, function(err, user) {
          if(err) {
            return res.json(err);
          }
          return res.json(comment);
        })

      });       // end of Messsage id query
    });         // end of Comment create
  },

  show: function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
      if(err) {
        return res.json(err);
      }
      // if(!comment){
      //   return res.json({
      //     errors: "Comment not found."
      //   });
      // }
      return res.json(comment);
    });   // end Comment id query
  },

  delete: function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
      if(err) {
        return res.json(err);
      }
      comment.remove(function(err, comment) {
        if(err) {
          return res.json(err);
        }
        return res.json(comment);
      });
    });   // end Comment id query
  },

};

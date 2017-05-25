var mongoose = require("mongoose");

var Message = mongoose.model("Message");
var User = mongoose.model("User");

module.exports = {
  index: function(req, res) {
    Message.find({}).populate("user").populate({
      path: "comments",
      model: "Comment",
      options: { sort: { createdAt: 1 }},
      populate: {
        path: "user",
        model: "User",
      }
    }).sort("-createdAt").exec(function(err, messages) {
      if(err) {
        return res.json(err);
      }
      return res.json(messages);
    });
  },

  create: function(req, res) {
    Message.create(req.body, function(err, message) {
      if(err) {
        return res.json(err);
      }
      User.findByIdAndUpdate(req.body.user, { $push: { messages: message._id }}, function(err, user) {
        if(err) {
          return res.json(err);
        }
        return res.json(message);
      });
    });
  },

  show: function(req, res) {
    Message.findById(req.params.id, function(err, message) {
      if(err) {
        return res.json(err);
      }
      // if(!message){
      //   return res.json({
      //     errors: "Message not found."
      //   });
      // }
      return res.json(message);
    });   // end Message id query
  },

  delete: function(req, res) {
    Message.findById(req.params.id, function(err, message) {
      if(err) {
        return res.json(err);
      }
      message.remove(function(err, message) {
        if(err) {
          return res.json(err);
        }
        return res.json(message);
      });
    });   // end Message id query
  },

  addLikes: function(req, res) {
    // .save method
    // Message.findById(req.params.id, function(err, message) {
    //   if(err) {
    //     return res.json(err);
    //   }
    //   message.likes++;
    //   message.save(function(err, message) {
    //     if(err) {
    //       return res.json(err);
    //     }
    //     return res.json(message);
    //   });
    // });
    // .findByIdAndUpdate method
    Message.findByIdAndUpdate(req.params.id, { $inc: { "likes.count": 1 }, $push: { "likes.users": req.body.user }}, { new: true }, function(err, message) {
      if(err) {
        return res.json(err);
      }
      return res.json(message);
    });
  },

};

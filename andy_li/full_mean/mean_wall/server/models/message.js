var mongoose = require("mongoose");

var Comment = mongoose.model("Comment");

var MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Message can't be blank."]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  },
}, { timestamps: true });

MessageSchema.pre("remove", function(callback) {
  var self = this;
  Comment.remove({ message: self._id }, function() {
    callback();
  });   // remove Comment 1st
});     // remove Message 2nd

mongoose.model("Message", MessageSchema);

var mongoose = require("mongoose");

console.log("Friends model...");
var FriendSchema = new mongoose.Schema({
 name: {
   type: String,
   required: [true, "Name input can't be blank."],
   minlength: [2, "Name must be at least 2 characters."]},
}, {timestamps: true});

mongoose.model('Friend', FriendSchema);

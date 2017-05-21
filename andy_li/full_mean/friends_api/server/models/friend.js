var mongoose = require("mongoose");

console.log("Friends model...");
var FriendSchema = new mongoose.Schema({
  first_name: {
   type: String,
   required: [true, "First name input can't be blank."],
   minlength: [2, "Name must be at least 2 characters."]},
  last_name: {
   type: String,
   required: [true, "Last name input can't be blank."],
   minlength: [2, "Name must be at least 2 characters."]},
  bday: {
   type: String,
   required: [true, "Birthday input can't be blank."],
   validate: {
     validator: function(dateStr) {
       var regEx = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
       return regEx.test(dateStr);
     },
     message: "Birthday input is invalid."
   },
 }

}, {timestamps: true});

mongoose.model('Friend', FriendSchema);

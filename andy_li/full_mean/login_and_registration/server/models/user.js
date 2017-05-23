var mongoose = require("mongoose");
var bcrypt = require("bcryptjs")

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name input can't be blank."]
  },
  email: {
    type: String,
    required: [true, "E-mail input can't be blank."],
    validate: {
      validator: function(emailStr) {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(emailStr);
      },
      message: "E-mail format is invalid."
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password input can't be blank."],
    minlength: 2
  },
  birthday: {
    type: String,
    required: [true, "Birthday input can't be blank."],
  }
});

UserSchema.methods.hashPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}

UserSchema.pre("save", function(callback) {
  this.hashPassword(this.password);
  callback();
});

mongoose.model("User", UserSchema);

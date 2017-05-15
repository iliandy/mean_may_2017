var mongoose = require("mongoose");

var DragonSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 2},
 owner: {type: String, required: true, minlength: 2},
}, {timestamps: true});

mongoose.model('Dragon', DragonSchema);

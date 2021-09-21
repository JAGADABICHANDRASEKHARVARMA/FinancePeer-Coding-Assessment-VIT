var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var jsonfiledataSchema = new mongoose.Schema({
   jsondata: String
})

// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Jsonfiledata", jsonfiledataSchema); 
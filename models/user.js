var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    // todos: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Todo"
    // }],
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema); 
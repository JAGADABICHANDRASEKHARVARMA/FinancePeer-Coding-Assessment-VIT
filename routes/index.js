const express      = require("express");
const router       = express.Router();
const passport     = require("passport");
const fs           = require("fs");
const User         = require("../models/user");
const Jsonfiledata = require("../models/jsonfiledata");

router.use(express.static(__dirname + "/public"));

// ========== index ========== //

router.get("/", function (req, res) {
    res.render("landing");
})

//  signup Form ===========

router.get("/register", function (req, res) {
    res.render("register", {page: 'register'})
})


//  sign up Logic ==========

router.post("/register", function (req, res) {
    const newUser = new User({
        name: req.body.name,
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }   
        passport.authenticate("local")(req, res, function () {
            console.log(user);
            req.flash("success","welcome to Camps " + user.username);
            res.redirect("/fileload");
        })
    })
})

//  Login Form ==========

router.get("/login", function (req, res) {
    res.render("login", {page: 'login'});
})

//  Login logic =============

router.post("/login", passport.authenticate("local", {
    successRedirect: "/fileload",
    failureRedirect: "/login",
    
failureFlash: true
}), function (req, res) {});


// Logout ===================

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "you have successfully logged out");
    res.redirect("/");
});

// Authorized====================

router.get("/fileload",function(req, res){
  res.render("files/fileload",{name: req.user.name});
})

router.get("/display", function(req,res){
    Jsonfiledata.find({}, function (err, alljsonfiledata) {
      if (err) {
          console.log("err");
      } else {
          // var n = [];
          
          // alljsonfiledata.forEach(function(data){
          //   // n.push(JSON.parse(data));
          //   console.log(data);  
          // })
          res.render("files/display", {datas: alljsonfiledata});
          // res.send("dfasdf");
      }
  })
})

router.post("/fileload", function(req, res){
  fs.readFile("public/JSON/"+req.body.jsonfile, function(err, jdata){
    if(err){
      console.log(err);
    }else{       
      Jsonfiledata.create({jsondata: jdata}, function(error, jsonfiledata){
        if(error){
          console.log(error)
        }else{
          console.log(jsonfiledata);  
          console.log(req.body.jsonfile);
          // res.send(req.body.jsonfile + "<br>" + jsonfiledata);
          res.redirect("display");
        }
      })
    }
  })
  
})

module.exports = router;
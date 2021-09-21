const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      fs                    = require("fs"),
      mongoose              = require("mongoose"),
      flash                 = require("connect-flash"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      methodOverride        = require("method-override"),
      expressSanitizer      = require("express-sanitizer"),
      Jsonfiledata          = require("./models/jsonfiledata"),
      User                  = require("./models/user");

      // Campground            = require("./models/campgrounds");

      const PORT = process.env.PORT || 3000

// const commentRoutes = require("./routes/comment"),
//     campgroundRoutes = require("./routes/campground");

const indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/json1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

// mongoose.connect("",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: false
// })

app.use(flash());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.locals.moment = require("moment");

//====  Authentication ====== //

app.use(require("express-session")({
    secret: "chandini",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seedDB();  ========= Seeding DataBase //

// ====== remove all ============//

// Campground.remove({},function(err){console.log("camps removed")});
// Comment.remove({},function(err){console.log("comments removed")});
// User.remove({},function(err){console.log("users removed")});

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//============
//   ROUTES
//============

// app.use("/camps/:id/comments", commentRoutes);
// app.use("/camps", campgroundRoutes);
app.use("/", indexRoutes);
// app.use(todoRoutes);

// app.use("")

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


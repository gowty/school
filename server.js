const express = require("express");
const httpProxy = require("http-proxy");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const User = require("./auth/models/usermodel.js");

const router = require("./auth/router");

//USE FLASH

const app = express();

app.use(express.static("public"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

mongoose.connect("mongodb://gow:qwerty@ds111608.mlab.com:11608/auths");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "# MongoDB- connection error:"));

app.use(
  session({
    secret: "my name is baymax",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 2 * 24 * 60 * 60 },
    store: new MongoStore({ mongooseConnection: db, ttl: 2 * 4 * 60 * 60 })
  })
);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// auth routes
router(app);

// all api routes
const qbanks = {
  qbank: [
    {
      question: "what is ur name-g",
      choices: [
        { label: "baymax", value: 1 },
        { label: "gowty", value: 2 },
        { label: "pow", value: 3 },
        { label: "stark", value: 4 }
      ]
    },
    {
      question: "what is ur name-g",
      choices: [
        { label: "baymax", value: 1 },
        { label: "gowty", value: 2 },
        { label: "pow", value: 3 },
        { label: "stark", value: 4 }
      ]
    },
    {
      question: "what is ur name-g",
      choices: [
        { label: "baymax", value: 1 },
        { label: "gowty", value: 2 },
        { label: "pow", value: 3 },
        { label: "stark", value: 4 }
      ]
    },
    {
      question: "what is ur name-g",
      choices: [
        { label: "baymax", value: 1 },
        { label: "gowty", value: 2 },
        { label: "pow", value: 3 },
        { label: "stark", value: 4 }
      ]
    },
    {
      question: "what is ur name-g",
      choices: [
        { label: "baymax", value: 1 },
        { label: "gowty", value: 2 },
        { label: "pow", value: 3 },
        { label: "stark", value: 4 }
      ]
    },
    {
      question: "what is ur name-g",
      choices: [
        { label: "baymax", value: 1 },
        { label: "gowty", value: 2 },
        { label: "pow", value: 3 },
        { label: "stark", value: 4 }
      ]
    }
  ],
  answers: [1, 4, 3, 4, 2, 1]
};
app.get("/qbank", function(req, res, next) {
  res.json(qbanks.qbank);
});

app.post("/test-submission", function(req, res) {
  var answers = qbanks.answers;
  var submittedanswers = req.body.answers;
  var _id = req.body._id;
  console.log(answers);
  // User.findById(_id, function(err, user) {
  // 	if (err) {
  // 		return false;
  // 	}
  // 	if (answers[0] != null) {
  // 		for (var i = 0; i < answers.length; i++) {
  // 			if (answers[i] == submittedanswers[i]) {
  // 				marks = marks + 1;
  // 			}
  // 		}
  // 		user.started = true;
  // 		user.marks = marks;
  // 		user.save();
  // 		console.log(marks);
  // 		res.json(marks);
  // 	}
  // });

  var marks = 0;
  submittedanswers.map(function(ans, i) {
    if (answers[i] == submittedanswers[i]) {
      return (marks = marks + 1);
    } else {
      return marks;
    }
  });

  function marks() {}
  User.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        started: true,
        marks: marks
      }
    },
    { new: true },
    function(err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
      res.json(marks);
    }
  );
});

// static file routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 6000, () => {
  console.log("static server running in port 6000");
});

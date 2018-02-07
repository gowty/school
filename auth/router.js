const authentication = require("./controllers/authentication");
const passportStrategy = require("./services/passport");
const passport = require("passport");
const jwt_decode = require("jwt-decode");
const User = require("./models/usermodel.js");
const express = require("express");
const path = require("path");
const ejs = require("ejs");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
	// app.use(function(req, res, next) {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header(
	// 		"Access-Control-Allow-Headers",
	// 		"Origin, X-Requested-With, Content-Type, Accept, authorization"
	// 	);
	// 	next();
	// });

	app.use(express.static(path.join(__dirname, "html")));
	app.set("views", path.join(__dirname, "views"));
	app.set("view engine", "ejs");

	// get routes
	app.get("/auth", requireAuth, function(req, res, next) {
		res.send(req.user);
	});

	app.get("/forgot-password/:token", function(req, res, next) {
		var decoded = jwt_decode(req.params.token);
		res.render("forgot-password", { token: req.params.token });
	});

	app.post("/setpassword/:token", function(req, res, next) {
		let a = {};
		var decoded = jwt_decode(req.params.token);
		let password = req.body.password;
		User.findById(decoded.sub, function(err, doc) {
			if (err) {
				return false;
			}
			doc.password = password;
			doc.save();
			res.send("/");
		});
	});

	app.get("/logout", function(req, res, next) {
		req.logout();
		res.send({ loggedout: "loggedout" });
	});
	// post router
	// signup route
	app.post(
		"/create-forgot-password-link",
		authentication.createforgotpasswordlink
	);
	app.post("/signin", requireSignin, authentication.signin);
	app.post("/signup", authentication.signup);
};

var express = require("express"),
	app = express(),
	logfmt = require("logfmt"),	
	path = require('path'),
    fs = require('fs'),
	passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
	clientID: "654765054608952",
	clientSecret: "32f8a00e838b2c8aa722eafb936b684c",
	callbackURL: "http://localhost:5000/"
	},
	function(accessToken, refreshToken, profile, done) {
/* 		User.findOrCreate(..., function(err, user) {
		  if (err) { return done(err); }
		  done(null, user);
		}); */
	}
));

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {});
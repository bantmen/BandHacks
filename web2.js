var express = require("express"),
	app = express(),
	logfmt = require("logfmt"),	
	path = require('path'),
    fs = require('fs'),
	passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
	pg = require('pg');
	

passport.use(new FacebookStrategy({
	clientID: "654765054608952",
	clientSecret: "32f8a00e838b2c8aa722eafb936b684c",
	callbackURL: "http://localhost:5000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
/* 		User.findOrCreate(..., function(err, user) {
		  if (err) { return done(err); }
		  done(null, user);
		}); */
	}
));

app.get("/", function(req, res) {
	var DATABASE_URL = "postgres://lqhwwuagklpoin:AQ_wXUpcw3s6eJXQDdW__CWOj8@ec2-54-197-237-120.compute-1.amazonaws.com:5432/d51f19hl0iptdt";
	pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('CREATE TABLE User (name email username provider facebook)');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});
})


app.use(logfmt.requestLogger());

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {});
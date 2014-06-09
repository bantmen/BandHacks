var express = require("express"),
	app = express(),
	logfmt = require("logfmt"),	
	path = require('path'),
    fs = require('fs'),
    pg = require('pg');
	passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

	
app.use(logfmt.requestLogger());

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
	var connectionString = "postgres://lqhwwuagklpoin:AQ_wXUpcw3s6eJXQDdW__CWOj8@ec2-54-197-237-120.compute-1.amazonaws.com:5432/d51f19hl0iptdt";
	pg.connect(connectionString, function(err, client) {
		if (err) {
			res.end("ERR");
			console.dir(err);
		}
		else {
			//var query = client.query('CREATE TABLE User (name VARCHAR(40), email VARCHAR(40), username VARCHAR(40) PRIMARY KEY, provider VARCHAR(40), facebook VARCHAR(40))');
			//client.query('INSERT INTO User (name, email, username, provider, facebook) VALUES ("a", "b", "c", "d", "e")');
            client.query('SELECT * FROM User', function (err, result) {
                if (err) {res.end("ERR-2");}
                else {
                    res.write("here");
                    //res.write(result.rows.length);
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows[i];
                        res.write("here");
                        res.write(row.name);
                        res.write(row.email);
                        res.write(row.username);
                    }
                }
            });
			res.end("NO ERR");
		}
	});
});



app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {});
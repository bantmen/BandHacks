var express = require("express"),
	app = express(),
	logfmt = require("logfmt"),	
	path = require('path'),
    fs = require('fs'),
    pg = require('pg');
	passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;


app.use(logfmt.requestLogger());

app.use(express.static(__dirname));

passport.use(new FacebookStrategy({
	clientID: "654765054608952",
	clientSecret: "32f8a00e838b2c8aa722eafb936b684c",
	//callbackURL: "http://localhost:5000/auth/facebook/callback"
	callbackURL: "http://bandhacks.herokuapp.com/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
/* 		console.log(000000000000000000000000);
		client.query('SELECT id FROM "Users" WHERE id=$1', [profile.id], function (err, result) {
			if (err) {
				console.log(111111111111111);
				res.end(err);
			}
			if (result.rows[0]) {
				console.log(222222222222222);
				return done(err, result.rows[0]);  
			 }
			else {     
				console.log(333333333333333);
				client.query('INSERT INTO "User" (name, email, username, provider, id)  \
				VALUES ($1, $2, $3, $4, $5), [profile.displayName, profile.emails[0].value, profile.username, "facebook", profile._json.id]', function (err, result) {
					if (err) res.end(err);
				});
			}	
			res.end(); */
		});
	}
));

app.get("/", function(req, res) {
/* 	var connectionString = "postgres://postgres:root@localhost/postgres";
	//var connectionString = "postgres://lqhwwuagklpoin:AQ_wXUpcw3s6eJXQDdW__CWOj8@ec2-54-197-237-120.compute-1.amazonaws.com:5432/d51f19hl0iptdt";
	pg.connect(connectionString, function(err, client) {
		if (err) {
			res.end("ERR");
			console.dir(err);
		}
		else {
			client.query('SELECT name FROM "Users"', function (err, result) {
 				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows[i];
					console.log(row.name);
				}
            });
			res.write("NO ERR");
			res.end();
		}
	}); */
	res.end();
});


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {console.log("Listening on port: " + port)});
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

app.use(passport.initialize());
app.use(passport.session()); 

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
	//clientID : "657777250974399",                   //for test
	//clientSecret: "6bbd5edcc7d4b9b3ff1da43b8b09239d",
	clientID : "654765054608952",
	clientSecret : "32f8a00e838b2c8aa722eafb936b684c",
	//callbackURL: "http://localhost:5000/auth/facebook/callback"
	callbackURL : "http://bandhacks.herokuapp.com/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		//var connectionString = "postgres://postgres:root@localhost/postgres";
		var connectionString = "postgres://qsxtzbqlsljdiy:HVNOigVMRb_JxhP4II7uut1JV9@ec2-54-197-237-231.compute-1.amazonaws.com:5432/dbig67cfjnt8na";
		pg.connect(connectionString, function (err, client) {
			client.query('SELECT id FROM "Users" WHERE id=$1', [profile.id], function (err, result) {
			if (err) {
				return done(err);
			}
			if (result.rows[0]) {
				var user = {username : result.rows[0]};
				return done(null, result.rows[0]);   
			 }
			else {     
				var sqlParams = [profile.displayName || "no displayname", profile.emails ? profile.emails[0].value : "no email", profile.username || "no username", "facebook", profile._json.id || "problem with _json.id"];
				var query = client.query('INSERT INTO "Users" (name, email, username, provider, id) VALUES ($1, $2, $3, $4, $5)', sqlParams, function (err, result) {
					var user = {username : profile.displayName};
					if (err) {
						return done(err);
					}
					else {
						return done(null, user);
						
					}
				});	
			} 
		});
	}
)}));

app.get("/", function(req, res) {
/* 	var connectionString = "postgres://postgres:root@localhost/postgres";
//	var connectionString = "postgres://qsxtzbqlsljdiy:HVNOigVMRb_JxhP4II7uut1JV9@ec2-54-197-237-231.compute-1.amazonaws.com:5432/dbig67cfjnt8na";
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

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
									  
app.get('/login', function(req, res){
        res.end("HELLO WORLD");
	});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {console.log("Listening on port: " + port)});
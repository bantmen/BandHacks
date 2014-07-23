var express = require("express"),
	app = express(),
	logfmt = require("logfmt"),
    pg = require('pg');
	passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    bodyParser = require('body-parser'),
	user = "",
    connectionString = "postgres://postgres:root@localhost/postgres";
    //connectionString = "postgres://qsxtzbqlsljdiy:HVNOigVMRb_JxhP4II7uut1JV9@ec2-54-197-237-231.compute-1.amazonaws.com:5432/dbig67cfjnt8na";


//app.use(logfmt.requestLogger());

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
	clientID : "654765054608952",
	clientSecret : "32f8a00e838b2c8aa722eafb936b684c",
	callbackURL: "http://localhost:5000/auth/facebook/callback"
	//callbackURL : "http://bandhacks.herokuapp.com/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		pg.connect(connectionString, function (err, client) {
			client.query('SELECT id FROM "Users" WHERE id=$1', [profile.id], function (err, result) {
                if (err) {
                    return done(err);
                }
                if (result.rows[0]) {  //works because id is the Unique Key
                    user = {username : profile.displayName, id: profile.id};
                    return done(null, user);
                 }
                else {
                    var sqlParams = [profile.displayName || "no displayname", profile.emails ? profile.emails[0].value : 'no email',
                                     profile.username || 'no username', 'facebook', profile._json.id || 'problem with _json.id'];
                    var query = client.query('INSERT INTO "Users" (name, email, username, provider, id) VALUES ($1, $2, $3, $4, $5)', sqlParams, function (err, result) {
                        user = {username : profile.displayName};
                        if (err) {
                            return done(err);
                        }
                        else {
                            return done(null, user);

                        }
                    });
                }
            });
        })
    }
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	scope: ['email', 'user_about_me'],
	successRedirect: '/dashboard.html',
	failureRedirect: '/failed.html'
	}
));

app.get('/api/user', function(req, res) {
	res.json(user);
    res.end();
});

app.get('/api/tasks-retrieve', function(req, res){
    console.log('inside retrieve');
    pg.connect(connectionString, function (err, client, done) {
        client.query('SELECT tasks from "Users" WHERE id=$1', [user.id], function(err, result){
            console.log('--------');
            console.log(result);
            console.log('--------');
            console.log(result.rows);
            done();
            if (err) {
                console.log(err);
            }
            if (result.rows[0] && result.rows[0].tasks != null){ //works because id is the Unique Key
                console.log('%s %s','retrieved: ', result.rows[0].tasks)
                var tasksArray = result.rows[0].tasks.split("$next$");
                tasksArray.pop();
                res.send(tasksArray);
            }
        });
    });
});

app.post('/api/tasks-create', bodyParser(), function(req, res){
    console.log('inside create');
    var tasks = req.body[0];
    console.log('first');
    console.log(tasks);
    pg.connect(connectionString, function (err, client, done) {
        client.query('SELECT tasks from "Users" WHERE id=$1', [user.id], function(err, selectResult){
            if (err) {
                console.log('first error');
                console.log(err);
                done();
            }
            else{
                console.log('between');
                console.log(selectResult.rows[0].tasks);
                if (selectResult.rows[0].tasks == null){
                    var tasksString = tasks+'$next$';
                }
                else{
                    var tasksString = selectResult.rows[0].tasks+tasks+'$next$';
                }
                client.query('UPDATE "Users" SET tasks=$1 WHERE id=$2', [tasksString, user.id], function(err, insertResult){
                    console.log('second');
                    console.log(tasksString);
                    done();
                    if (err) {
                        console.log('second error');
                        console.log(err);
                    }
                });
            }
        });
    });
});

app.post('/api/tasks-delete', bodyParser(), function(req, res){
    console.log('inside delete');
    var index = req.body.ind;
    console.log(index);
    pg.connect(connectionString, function (err, client, done) {
        client.query('SELECT tasks from "Users" WHERE id=$1', [user.id], function(err, selectResult){
            if (err) {
                console.log('first error');
                console.log(err);
                done();
            }
            else{
                if (selectResult){
                    var tasksArray = selectResult.rows[0].tasks.split("$next$");
                    tasksArray.splice(index, 1);
                    var tasksString = tasksArray.join('$next$')
                }
                client.query('UPDATE "Users" SET tasks=$1 WHERE id=$2', [tasksString, user.id], function(err, insertResult){
                    console.log(tasksString);
                    done();
                    if (err) {
                        console.log('second error');
                        console.log(err);
                    }
                });
            }
        });
    });
});

app.get('*', function(req, res) {
	res.sendfile('dashboard.html');  //single page app starts on dashboard.html
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {console.log("Listening on port: " + port)});


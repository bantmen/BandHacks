//http://stackoverflow.com/questions/21758779/node-js-express-js-hogan-js-returns-a-blank-page-sometimes
var
    http = require('http'),
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


function getFile(filePath,res,page404){
    fs.exists(filePath,function(exists){
        if (!exists) {
            fs.readFile(page404, function (err, contents) {
                if (!err) {
                    console.log(page404);
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.write(contents);
                    res.end();
                } else {
                    console.dir(err);
                }
                ;
            });
        } else {
            fs.readFile(filePath, function (err, contents) {
                if (!err) {
                    console.log(filePath);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(contents);
                    res.end();
                } else {
                    console.dir(err);
                }
                ;
            });
        };
    });
};

function requestHandler(req, res) {   //request, respond
    var
        fileName = path.basename(req.url) || 'index.html',
        page404 = '404.html';

    getFile((fileName),res,page404);
	
};

http.createServer(requestHandler).listen(Number(process.env.PORT || 5000)); 
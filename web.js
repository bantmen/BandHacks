//http://stackoverflow.com/questions/21758779/node-js-express-js-hogan-js-returns-a-blank-page-sometimes
var
http = require('http'),
path = require('path'),
fs = require('fs');

function getFile(filePath,res,page404){
    fs.exists(filePath,function(exists){
        if(exists){
            fs.readFile(filePath, function(err,contents){
                if(!err){
					//console.log(filePath);
					res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        } else {
            fs.readFile(page404, function(err,contents){
                if(!err){
					console.log(page404);
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        };
    });
};

function requestHandler(req, res) {
    var
    fileName = path.basename(req.url) || 'index.html',
    localFolder = __dirname + '\\',
    page404 = localFolder + '404.html';
//	console.log(fileName);
//	console.log(localFolder);

    getFile((localFolder + fileName),res,page404);
};


http.createServer(requestHandler).listen(Number(process.env.PORT || 5000)); 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require( 'path' );
var port = process.env.PORT || 5036;
var todoRoute = require('./routes/todo.js');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/todo', todoRoute);

// Serve back static files by default
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});













// var express = require( 'express' );
// var app = express();
// var bodyParser = require( 'body-parser' );
// var port = process.env.PORT || 5025;
// var path = require( 'path' );
// var todoRoute = require('./routes/todo.js');
//
// // create 'urlEncodedParser' in case we want to inject it for post calls:
// // var urlEncodedParser = bodyParser.urlencoded( { extended: true } );
// // use bodyParser.urlencoded throughout the app with this:
// app.use( bodyParser.urlencoded( { extended: true } ) );
//
// // app.set("port", (process.env.PORT || 5000));
//
// app.use('/todo', todoRoute);
//
//
//
//
//
// // catch-all
// app.get("/*", function(req, res) {
//   var file = req.params[0] || "/views/index.html";
//   res.sendFile(path.join(__dirname, "/public/", file));
// });
//
// app.listen( app.get("port"), function(){
//   console.log( 'server up on: ', app.get("port") );
// }); // end spin up server

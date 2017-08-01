'use strict';

const express = require('express');
const app = express();
var execSync = require('child_process').execSync;
var ntpClient = require('ntp-client');
var http = require('http'),
    fs = require('fs');

//for express 4
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.PORT || 3001));//Used at bottom to determine the port to run - default to 3001 when local

// Express only serves static assets in production - not needed?
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

var ntpRequestCount = Math.floor(Date.now() / 1000);

app.all('*', function (req, res, next) {
	
	if ( req.params[0] != '/favicon.ico' ){

		// console.log(req.params);
		// console.log('In request for * - setting Headers');
		// Website you wish to allow to connect
		//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

		// Request methods you wish to allow
		// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Methods', 'GET');

		// Request headers you wish to allow
		// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
		// res.setHeader('Access-Control-Allow-Credentials', true);

		// next() // pass control to the next handler
		res.status(200);
		res.write('Response from my api node server.');
		res.end();

	} else {
		res.status(404);
		res.end();
	}

});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

//Error reporting
app.use(function(err, req, res, next) {
  console.error(err.stack);
  var reply = '500 Internal Error...thing...';
  console.log(typeof err.stack);
  res.status(500).send(reply);
});

const express = require('express');
const app = express();
                                     // <=
var Promise = require("bluebird");
var port     = process.env.PORT ||  3000;

//TODO - check how work
//mongoose.connect(configDB.url); 


//var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); 
app.set('views', '../views');

app.use(session({secret: 'xxxxxxilovescotchscotchyscotchscotch', 
    saveUninitialized: true,
    resave: true}));


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var flash    = require('connect-flash');
app.use(flash()); // use connect-flash for flash messages stored in session

//routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
//app.listen(port);
//console.log('The magic happens on port ' + port);



//var sqlite3 = require('sqlite3').verbose();
//'./database.sqlite'
/*
//https://github.com/mapbox/node-sqlite3/blob/master/examples/simple-chaining.js
var sqlite3 = require('sqlite3');     
Promise.resolve()
	// First, try to open the database
	.then(() =>db = new sqlite3.Database('./database.sqlite', { Promise }))      // <=
	// Display error message if something went wrong
	.catch((err) => console.error(err.stack))
	// Finally, launch the Node.js app
	.finally(() => app.listen(port));
*/



var db = require('sqlite');     
Promise.resolve()
	// First, try to open the database
	.then(() => db.open('./database.sqlite', { Promise }))      // <=
	// Update db schema to the latest version using SQL-based migrations
	.then(() => db.migrate({ force: 'last' }))                  // <=
	// Display error message if something went wrong
	.catch((err) => console.error(err.stack))
	// Finally, launch the Node.js app
	.finally(() => app.listen(port));


console.log('Example app listening on port 3000!');
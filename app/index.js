const express = require('express');
const app = express();
                                     // <=
var Promise = require("bluebird");
const port =  3000;

app.get('/', (req, res) => res.send('Hello World!'));


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
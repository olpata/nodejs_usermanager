var express = require('express');
var app = express();
var port     = process.env.PORT ||  3000;
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load();
var exphbs = require('express-handlebars')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//add assets
app.use(express.static(__dirname + '/public'));

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Models
var models = require("./app/models");

var authRoute = require('./app/routes/auth.js')(app,passport, models);
//load passport strategies
require('./config/passport/passport.js')(passport, models);


 //Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.get('/', function(req, res) {
 
    res.send('Welcome to Passport with Sequelize');
 
});
 
 
app.listen(port, function(err) {
 
    if (!err)
        console.log(`Site is live (port ${port})`);
    else console.log(err)
 
});
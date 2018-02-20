 
module.exports = function(app,passport,models) {
    var authController = require('../controllers/authcontroller.js');
    authController.init(models);
    app.get('/', function (req, res) {
        res.redirect('/gameview');
    });

    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/dashboard',isLoggedIn, authController.dashboard);
    app.get('/gameview',isLoggedIn, authController.gameview);
    app.get('/logout',authController.logout);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
    ));
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
     
    };
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/gameview',
 
        failureRedirect: '/signin'
    }
 
));
}
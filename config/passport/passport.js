var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport, models) {
    var User = models.user;
    var LogLogin  = models.loglogin;
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data =
                        {
                            email: email,
                            password: userPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // deserialize user 
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    //LOCAL SIGNIN
    var logSigninAttempt = function(req,data){
            data.login_date =  new Date();
            data.login_ip = req.connection.remoteAddress
            console.log(`log attempt:id=${data.id} status=${data.status} ip=${data.login_ip} login_date=${data.login_date} `);
                    LogLogin.create(data).then(function (newLogRec, created) {
                        if (!newLogRec) {
                            console.log('error on create LogLogin record');
                        }
                    });
    }
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var User = models.user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {
                    logSigninAttempt(req,{id: 0,status:'fail: wrong email'});
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    logSigninAttempt(req,{user_id: user.id,result:'fail: wrong password'});
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                var userinfo = user.get();
                logSigninAttempt(req,{user_id: user.id,result:'ok'});
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                logSigninAttempt({user_id: 0,result:`fail: ${err}`});
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
}

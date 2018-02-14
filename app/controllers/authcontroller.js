var moment = require('moment');
var exports = module.exports = {}
var models;
exports.init = function(db_data){
    models = db_data;
}
exports.signup = function(req, res) {
    res.render('signup');
 
}
exports.signin = function(req, res) {
 
    res.render('signin');
 
}
exports.dashboard = function(req, res) {
   //console.log(`req.user.username = ${req.user.username} / req.user.id = ${req.user.id}`);

    var this_user;
    models.user.findById(req.user.id)
    .then(function (user) {
        if (!user) {
            return;
        } 

        this_user = user;
        models.loglogin.findAll({
            where: {
              user_id: this_user.id
            },
            //order: '"login_date" DESC'
            order: [['login_date', 'DESC']]
          })
        .then(function (listLogins) {

           //console.log(`found user :/ ${this_user.email} / logins count = ${listLogins.length}`);
            //format date
            listLogins.forEach(element => {
                var wantDate = element.login_date.toISOString();
                var wantDate2 = moment(element.login_date).format("YYYY-MM-DD HH:mm:ss");
                element.login_sdate = wantDate2;
                //console.log(`${element.login_date} // ${wantDate} // ${wantDate2}`);
            });
            var data = {
                user: this_user,
                objects: listLogins
            };
            res.render('dashboard',data);
        });
    });


 
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}
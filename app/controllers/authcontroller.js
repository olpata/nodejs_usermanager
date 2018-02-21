var moment = require('moment');
var exports = module.exports = {};
var crisisPrepare = require('./crisiscontroller').crisisPrepare;
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
            order: [['login_date', 'DESC']]
          })
        .then(function (listLogins) {

           //console.log(`found user :/ ${this_user.email} / logins count = ${listLogins.length}`);
            //format date
            listLogins.forEach(element => {
                var wantDate2 = moment(element.login_date).format("YYYY-MM-DD HH:mm:ss");
                element.login_sdate = wantDate2;
            });
            var data = {
                user: this_user,
                objects: listLogins
            };
            res.render('dashboard',data);
        });
    });


 
}
exports.gameview = function(req, res) {
    //console.log(`req.user.username = ${req.user.username} / req.user.id = ${req.user.id}`);
 
     var this_user;
     models.user.findById(req.user.id)
     .then(function (user) {
         if (!user) {
             return;
         } 
 
         this_user = user;
         {
 
            //console.log(`found user :/ ${this_user.email} / logins count = ${listLogins.length}`);
             //format date
            var items = require('../testdata/testitems.js');
            var stats = require('../testdata/teststats');
            var eventPool = require('../testdata/testevents');
            var goals  = require('../testdata/testgoals');
            
            //console.log(`stats :/ ${JSON.stringify(stats)}`);
            //TODO - add function to form crisis and hero_after fields
            var data = {
                 hero: {items:items,stats:stats,eventPool:eventPool,goals:goals},
                 user: this_user,
                 view:{health_perc:stats.health*100/stats.health_max,sanity_perc:stats.sanity*100/stats.sanity_max}
//                 ,crisis:{name:"Find a shiny thing",img:"./assets/events/question.png",desc:"You see some thing shiny in a mud. You try to take from dirt.",post_challenge:{type:"dex",diff_level:0,curr_level:4,dice_count:1,roll_results:3,ispass:true},post_challenge:{desc:'challenge success. You get item knife.'} }
//                 ,hero_after: {items:items.slice(),stats:stats,eventPool:eventPool,goals:goals}
             };
//             data.hero_after.items.push(data.hero_after.items[0]);

             [data.crisis ,data.hero_after] =  crisisPrepare(data.hero.eventPool[0],data.hero);

             data.hero.items.forEach(function(item){
                item.tooltip = `<b>${item.name}</b> <p>${item.effect}</p> <i>${item.desc}</i>`;
             });
             //console.log(`stats: / ${JSON.stringify(data.hero.stats)}`);
             //console.log(`items: / ${JSON.stringify(data.hero.items)}`);
             //console.log(`events: / ${JSON.stringify(data.hero.eventPool)}`);
             //console.log(`goals: / ${JSON.stringify(data.hero.goals)}`);
             console.log(`crisis: / ${JSON.stringify(data.crisis)}`);
             console.log(`hero_after: / ${JSON.stringify(data.hero_after)}`);
             res.render('gameview',data);
         };
     });
 
 
  
 }
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}
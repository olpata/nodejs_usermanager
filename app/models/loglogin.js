module.exports = function(sequelize, Sequelize) {
 
    var LogLogin = sequelize.define('loglogin', {
 
        user_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
 
        login_date: {
            type: Sequelize.DATE,
            notEmpty: true
        },
 
        login_ip: {
            type: Sequelize.STRING,
        },
        result: {
            type: Sequelize.STRING,
        }
 
 
    }, {
        indexes: [
              
          // A BTREE index with a ordered field
          {
            name: 'user_when',
            fields: ['user_id','login_date'],
            unique: false
          }
        ]
      });
 
    return LogLogin;
 
}
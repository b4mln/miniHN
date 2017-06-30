const config  = require("../config");

const Sequelize = require('sequelize');
      sha1      = require('sha1');

const sequelize = new Sequelize(config.storage.database, config.storage.username, config.storage.password, config.storage.config);

// define models
let User = sequelize.define('User', {
    id:         { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username:   { type: Sequelize.STRING },
    name:       { type: Sequelize.STRING },
    email:      { type: Sequelize.STRING },
    token:      { type: Sequelize.STRING },
    password:   { type: Sequelize.STRING },
    created:    { type: Sequelize.DATE, defaultValue: sequelize.NOW }
}, { timestamps: false });

User.hashPassword = function(password) {
    return sha1(password);
};

module.exports = User;
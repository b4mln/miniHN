const config  = require("../config");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.storage.database, config.storage.username, config.storage.password, config.storage.config);

// define models
let Vote = sequelize.define('Vote', {
    userid:    { type: Sequelize.INTEGER, primaryKey: true },
    postid:    { type: Sequelize.INTEGER, primaryKey: true, },
    value:     { type: Sequelize.INTEGER },
    created:   { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, { timestamps: false });

module.exports = Vote;

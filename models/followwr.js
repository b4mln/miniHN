const config  = require("../config");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.storage.database, config.storage.username, config.storage.password, config.storage.config);

// define models.storage
let Follower = sequelize.define('Follower', {
    postid:    { type: Sequelize.INTEGER, primaryKey: true },
    userid:    { type: Sequelize.INTEGER, primaryKey: true }
}, { timestamps: false });

module.exports = Follower;
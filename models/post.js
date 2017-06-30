const config  = require("../config");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.storage.database, config.storage.username, config.storage.password, config.storage.config);

// define models.storage
let Post = sequelize.define('Post', {
    id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userid:    { type: Sequelize.INTEGER },
    content:   { type: Sequelize.TEXT },
    created:   { type: Sequelize.DATE, defaultValue: sequelize.NOW },
    updated:   { type: Sequelize.DATE }
}, { timestamps: false });

module.exports = Post;
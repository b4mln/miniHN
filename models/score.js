const config   = require("../config");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.storage.database, config.storage.username, config.storage.password, config.storage.config);

// define models.storage
let Score = sequelize.define('Score', {
    id:        { type: Sequelize.INTEGER, primaryKey: true },
    created:   { type: Sequelize.DATE },
    score:     { type: Sequelize.INTEGER },
    adjusted:  { type: Sequelize.FLOAT }
}, { timestamps: false });

module.exports = Score;
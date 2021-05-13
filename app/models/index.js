const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');

db.ROLES = ["user", "admin"];


const dbConfig = require("../config/db.config.js");


db.url = dbConfig.url;
db.projects = require('./project.model.js')(mongoose);

module.exports = db;


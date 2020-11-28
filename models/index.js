const mongoose = require("mongoose")

const db = {}
db.mongoose = mongoose;
db.url = '';
db.customer = require('./customer')(mongoose);

module.exports = db;